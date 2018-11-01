var map = [];

function getData(key) {
    if (!(key in map)) {
        map[key] = [];
    }
    return map[key];
}

module.exports = {
    scard: (key) => {
        return getData(key).length;
    },
    sadd: (key, val) => {
        getData(key)[val] = 1;
        return true;
    },
    smembers: (key) => {
        return Object.keys(getData(key));
    },
    srem: (key, val) => {
        var exists = val in getData(key);
        delete getData(key)[val];
        return exists;
    }
};
