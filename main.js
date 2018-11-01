const config = require('./config.json');
const async = require('async');

const uuid = require('uuid/v4');
const redis = require('async-redis');
const express = require('express');

async.auto({
    redis: (callback) => {
        callback(redis.createClient());
    },
    redisMng: ['redis', (results, callback) => {
        callback(require('./redis')(config, results.redis, uuid));
    }]
    app: ['redisMng', (results, callback) => {
        callback(require('./app')(config, express, results.redisMng));
    }]
});
