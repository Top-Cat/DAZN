const config = require('./config.json');

const redis = require('redis');
const redisMS = require('redis-mutex-semaphore');
const redisClient = redis.createClient();

redisClient.on('connect', function() {
    console.log('Redis client connected');
});

var redisSemaphoreFactory = redisMS(redisClient);

var semaphore = redisSemaphoreFactory.getSemaphoreClient('User1', 3);

semaphore.get((err, result) => {
    try {
        if (err && err.code == 'ENOTFOUNDKEY') {
            semaphore.reset();
        }
        console.log(err, result);
    } finally {
        semaphore.rel((err, result) => {
            console.log(err, result);
        });
    }
});
