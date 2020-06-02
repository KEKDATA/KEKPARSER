import Queue from 'bull';

import { getTextWithSentimentAnalysis } from '../lib/sentiment_analysis';

import { OPTIONS, MAX_JOBS_PER_WORKER } from './config';
import { getRuSentiment } from '../lib/ru_social_sentiment';

console.info('Sentiment connected');

const sentimentQueue = new Queue('sentiment', OPTIONS);
const mergeQueue = new Queue('merge', OPTIONS);

sentimentQueue.process(MAX_JOBS_PER_WORKER, async job => {
  const {
    englishTweets,
    russianTweets,
    id,
  }: {
    englishTweets: Array<{ text: string; textIndex: number }>;
    russianTweets: Array<{ text: string; textIndex: number }>;
    id: string;
  } = job.data;

  let tweetsWithSentiments: number[] = [];
  let meanSentiment = 0;
  let totalSentimentCoefficient = 0;

  const analyzedRussianTweets = await getRuSentiment(russianTweets);
  const analyzedEnglishTweets = getTextWithSentimentAnalysis(englishTweets);

  const russianSentiments = analyzedRussianTweets.dataWithSentiments;
  const englishSentiments = analyzedEnglishTweets.dataWithSentiments;

  const lengthOfRuSentiment = Object.values(russianSentiments).length;
  const lengthOfEnglishTweets = Object.values(englishSentiments).length;

  const summaryLength = lengthOfRuSentiment + lengthOfEnglishTweets;

  for (let i = 0; i < summaryLength; i++) {
    const russianSentimentCoefficient = russianSentiments[i];
    const englishSentimentCoefficient = englishSentiments[i];

    const actualSentimentCoefficient =
      russianSentimentCoefficient || englishSentimentCoefficient;

    tweetsWithSentiments.push(actualSentimentCoefficient);

    totalSentimentCoefficient =
      actualSentimentCoefficient + totalSentimentCoefficient;
  }

  meanSentiment = totalSentimentCoefficient / summaryLength;

  mergeQueue.add({
    jobId: id,
    options: { tweetsWithSentiments, meanSentiment, isSentiment: true },
  });
});
