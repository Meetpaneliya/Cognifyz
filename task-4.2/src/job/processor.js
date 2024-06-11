const myQueue = require('./queue');
myQueue.process(async (job) => {
  console.log(`Processing job ${job.id} with data:`, job.data);
});
