const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const redis = require('redis');
const Queue = require('bull');
const expressRedisCache = require('express-redis-cache');

// Create a Redis client with enhanced error handling
const redisClient = redis.createClient({
  host: '127.0.0.1',
  port: 6379,
  retry_strategy: (options) => {
    if (options.error && options.error.code === 'ECONNREFUSED') {
      return new Error('The server refused the connection');
    }
    if (options.total_retry_time > 1000 * 60 * 60) { // 1 hour
      return new Error('Retry time exhausted');
    }
    if (options.attempt > 20) {
      return new Error('Max attempts reached');
    }
    return Math.min(options.attempt * 100, 3000); // reconnect after
  },
  maxRetriesPerRequest: null // No limit on retries per request
});

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

// Create cache instance
const cache = expressRedisCache({
  client: redisClient
});

// Handle cache errors
cache.on('error', (err) => {
  console.error('Cache error:', err);
});

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Create a Bull queue
const myQueue = new Queue('myQueue', {
  redis: { host: '127.0.0.1', port: 6379 }
});

// Handle Bull queue errors
myQueue.on('error', (error) => {
  console.error('Bull queue error:', error);
});

// In-memory store for job data
const jobDataStore = {};

// Job processor
myQueue.process(async (job) => {
  console.log(`Processing job ${job.id} with data:`, job.data);
  // Perform the actual background task here
  // For the purpose of demonstration, let's assume the task is successful
  return Promise.resolve();
});

// Sample Route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Job Route
app.post('/add-job', (req, res) => {
  const jobData = req.body;
  console.log('Received job data:', jobData);

  myQueue.add(jobData)
    .then((job) => {
      // Store job data in the in-memory store
      jobDataStore[job.id] = jobData;
      res.status(200).send(`Job added with ID ${job.id}`);
    })
    .catch((error) => {
      console.error('Failed to add job:', error);
      res.status(500).send(`Failed to add job: ${error.message}`);
    });
});

// Data Route with Cache
app.get('/data', cache.route({ expire: 60 }), (req, res) => {
  const data = Object.entries(jobDataStore).map(([id, jobData]) => ({ id, ...jobData }));
  res.status(200).json(data);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
