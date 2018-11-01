module.exports = (config, client, uuid) => {

    return {
        createStream: async function(userId, streamId = uuid()) {
            var streamCount = await client.scard(config.redisPrefix + userId);

            if (streamCount >= config.maxConcurrency) { return false; }

            await client.sadd(config.redisPrefix + userId, streamId);
            return streamId;
        },

        getStreams: async function(userId) {
            return client.smembers(config.redisPrefix + userId);
        },

        deleteStream: async function(userId, streamId) {
            return await client.srem(config.redisPrefix + userId, streamId) > 0;
        }
    }
};
