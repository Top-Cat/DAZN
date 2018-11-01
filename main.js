const config = require('./config.json');
const TEST_USER = 'User1';

const uuid = require('uuid/v4');
const redis = require('async-redis');
const redisClient = redis.createClient();

redisClient.on('connect', async function() {
    console.log('Redis client connected');

    console.log(await createStream(TEST_USER));
    var streams = await getStreams(TEST_USER);

    console.log(streams);
    if (streams.length > 2) {
        for (x in streams) {
            deleteStream(TEST_USER, streams[x]);
        }
    }
});

async function createStream(userId, streamId = uuid()) {
    var streamCount = await redisClient.scard(config.redisPrefix + userId);

    if (streamCount >= config.maxConcurrency) { return false; }

    await redisClient.sadd(config.redisPrefix + userId, streamId);
    return true;
}

async function getStreams(userId) {
    return redisClient.smembers(config.redisPrefix + userId);
}

async function deleteStream(userId, streamId) {
    await redisClient.srem(config.redisPrefix + userId, streamId);
}
