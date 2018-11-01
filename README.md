# DAZN Tech Test

## Installation

Requires Node.js with async/await support (8+) and Docker

Install the dependencies and start up a local redis instance then start the app
```sh
npm install
docker run -d -p 6379:6379 redis
npm start
```

The app will use port 3000 by default so browse to `http://localhost:3000`

## Endpoints

GET /:userId - List the streams for a given user
POST /:userId - Create a stream with a generated UUID
PUT /:userId/:streamId - Create a stream with a provided ID
DELETE /:userId/:streamId - Delete a stream by ID

## Scalability strategy

Using redis as the storage engine means we can use existing redis scaling solutions. Redis cluster can automatically patition data between nodes.
