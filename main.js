const config = require('./config.json');
const async = require('async');

const uuid = require('uuid/v4');
const redis = require('async-redis');
const express = require('express');

async.auto({
    redis: (callback) => {
        callback(null, redis.createClient(config.redis.port, config.redis.host));
    },
    redisMng: ['redis', (results, callback) => {
        callback(null, require('./app/redis')(config, results.redis, uuid));
    }],
    app: ['redisMng', (results, callback) => {
        callback(null, require('./app/app')(config, express, results.redisMng));
    }]
});
