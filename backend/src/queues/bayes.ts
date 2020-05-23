import Queue from 'bull';

import { getTextWithBayesClassifier } from '../lib/bayes_classifier/bayes_classifier';

console.info('Bayes connected');

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

const bayesQueue = new Queue('bayes', options);
const callbackQueue = new Queue('callback', options);

const maxJobsPerWorker = 10;

bayesQueue.process(maxJobsPerWorker, job => {
  const { normalizedTweetsForAnalysis, id } = job.data;

  const tweetsWithBayesClassifier = getTextWithBayesClassifier(
    normalizedTweetsForAnalysis,
  );

  callbackQueue.add({
    jobId: id,
    options: { tweetsWithBayesClassifier, isBayes: true },
  });
});
