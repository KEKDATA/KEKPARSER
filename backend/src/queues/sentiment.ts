import Queue from 'bull';

import { getTextWithSentimentAnalysis } from '../lib/sentiment_analysis/sentiment_analysis';

import { OPTIONS, MAX_JOBS_PER_WORKER } from './config';

console.info('Sentiment connected');

const sentimentQueue = new Queue('sentiment', OPTIONS);
const callbackQueue = new Queue('callback', OPTIONS);

sentimentQueue.process(MAX_JOBS_PER_WORKER, job => {
  const {
    normalizedTweetsForAnalysis,
    id,
  }: { normalizedTweetsForAnalysis: Array<string>; id: string } = job.data;

  const {
    dataWithSentiments: tweetsWithSentiments,
    meanSentiment,
  } = getTextWithSentimentAnalysis(normalizedTweetsForAnalysis);

  callbackQueue.add({
    jobId: id,
    options: { tweetsWithSentiments, meanSentiment, isSentiment: true },
  });
});
