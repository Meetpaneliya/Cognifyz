const Queue = require('bull');
const myQueue = new Queue('myQueue', { redis: { port: 6379, host: '127.0.0.1' } });
module.exports = myQueue;
