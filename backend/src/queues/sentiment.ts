import Queue from 'bull';

import { getTextWithSentimentAnalysis } from '../lib/sentiment_analysis/sentiment_analysis';

console.info('Sentiment connected');

const defaultJobOptions = {
  removeOnComplete: true,
  removeOnFail: false,
};

const redis = {
  host: 'localhost',
  port: 6379,
  maxRetriesPerRequest: null,
  connectTimeout: 180000,
};

const options = { defaultJobOptions, redis };

const sentimentQueue = new Queue('sentiment', options);
const callbackQueue = new Queue('callback', options);

const maxJobsPerWorker = 10;

sentimentQueue.process(maxJobsPerWorker, job => {
  const { normalizedTweetsForAnalysis, id } = job.data;

  const {
    dataWithSentiments: tweetsWithSentiments,
    meanSentiment,
  } = getTextWithSentimentAnalysis(normalizedTweetsForAnalysis);

  callbackQueue.add({
    jobId: id,
    options: { tweetsWithSentiments, meanSentiment, isSentiment: true },
  });
});
