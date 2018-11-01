module.exports = (config, express, redis) => {
    const app = express();

    app.get('/:userId', async (req, res) => {
        res.send(await redis.getStreams(req.params.userId));
    });

    app.post('/:userId', async (req, res) => {
        var uuid = await redis.createStream(req.params.userId);
        res.status(uuid.length > 0 ? 200 : 500).send(uuid);
    });

    app.put('/:userId/:streamId', async (req, res) => {
        res.status(await redis.createStream(req.params.userId, req.params.streamId) ? 200 : 500).send();
    });


    app.delete('/:userId/:streamId', async (req, res) => {
        res.status(await redis.deleteStream(req.params.userId, req.params.streamId) ? 200 : 404).send();
    });

    app.listen(config.port, () => {});
};
