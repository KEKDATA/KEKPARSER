import Queue from 'bull';

import { getTextWithBayesClassifier } from '../lib/bayes_classifier/bayes_classifier';

import { OPTIONS, MAX_JOBS_PER_WORKER } from './config';

console.info('Bayes connected');

const bayesQueue = new Queue('bayes', OPTIONS);
const mergeQueue = new Queue('merge', OPTIONS);

bayesQueue.process(MAX_JOBS_PER_WORKER, job => {
  const {
    normalizedTweetsForAnalysis,
    id,
  }: { normalizedTweetsForAnalysis: Array<string>; id: string } = job.data;

  const tweetsWithBayesClassifier = getTextWithBayesClassifier(
    normalizedTweetsForAnalysis,
  );

  mergeQueue.add({
    jobId: id,
    options: { tweetsWithBayesClassifier, isBayes: true },
  });
});
