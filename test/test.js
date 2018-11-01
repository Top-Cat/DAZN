const assert = require('assert');
const redisMock = require('./redisMock');

var config = {redisPrefix: "", maxConcurrency: 3};
const redisMng = require('../app/redis')(config, redisMock);

describe('Stream Manager', () => {
    describe('createStream', () => {
        it('should append streamId to the set if below maximum concurrency', async () => {
            redisMock.setState("TEST_USER", []);

            assert.equal(await redisMng.createStream("TEST_USER", "1"), "1");
            assert.deepEqual(redisMock.smembers("TEST_USER"), ["1"]);

            assert.equal(await redisMng.createStream("TEST_USER", "2"), "2");
            assert.deepEqual(redisMock.smembers("TEST_USER"), ["1", "2"]);

            assert.equal(await redisMng.createStream("TEST_USER", "3"), "3");
            assert.deepEqual(redisMock.smembers("TEST_USER"), ["1", "2", "3"]);

            assert.equal(await redisMng.createStream("TEST_USER", "4"), false);
            assert.deepEqual(redisMock.smembers("TEST_USER"), ["1", "2", "3"]);

            config.maxConcurrency = 4;

            assert.equal(await redisMng.createStream("TEST_USER", "4"), "4");
            assert.deepEqual(redisMock.smembers("TEST_USER"), ["1", "2", "3", "4"]);
        });
    });

    describe('getStreams', () => {
        it('should get the list of active streams for a given user', async () => {
            redisMock.setState("TEST_USER", []);
            assert.deepEqual(await redisMng.getStreams("TEST_USER"), []);

            redisMock.setState("TEST_USER", ["1", "2", "3"]);
            assert.deepEqual(await redisMng.getStreams("TEST_USER"), ["1", "2", "3"]);
        });
    });

    describe('deleteStream', () => {
        it('should the streamId if it exists for a user', async () => {
            redisMock.setState("TEST_USER", []);
            redisMock.setState("TEST_USER2", ["1"]);
            assert.equal(await redisMng.deleteStream("TEST_USER", "1"), false);
            assert.deepEqual(redisMock.smembers("TEST_USER"), []);
            assert.deepEqual(redisMock.smembers("TEST_USER2"), ["1"]);

            redisMock.setState("TEST_USER", ["2"]);
            assert.equal(await redisMng.deleteStream("TEST_USER", "2"), true);
            assert.deepEqual(redisMock.smembers("TEST_USER"), []);
            assert.deepEqual(redisMock.smembers("TEST_USER2"), ["1"]);
        });
    });
});
