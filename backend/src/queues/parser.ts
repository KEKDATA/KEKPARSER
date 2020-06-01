import Queue from 'bull';

import { setupWebdriverFx } from '../webdriver';

import { getTextWithAlphaOnly } from '../lib/normalizers/alphabet';

import { createdTwitterParse } from '../twitter/twitter_parse';
import { ParsedTweets, TweetsTabs } from '../twitter/types';

import { OPTIONS, MAX_JOBS_PER_WORKER } from './config';
import { Send } from '../types';
import { ENG, RU } from '../constants/language';

console.info('Parser connected');

const parserQueue = new Queue('parser', OPTIONS);
const sentimentQueue = new Queue('sentiment', OPTIONS);
const bayesQueue = new Queue('bayes', OPTIONS);
const mergeQueue = new Queue('merge', OPTIONS);

parserQueue.process(MAX_JOBS_PER_WORKER, async job => {
  const {
    id,
    options,
    tweetsType,
  }: { tweetsType: TweetsTabs; id: string; options: Send } = job.data;

  const { page } = await setupWebdriverFx({ options });
  const {
    parsedTweets,
  }: { parsedTweets: ParsedTweets } = await createdTwitterParse({
    tweetsType,
    page,
  });

  mergeQueue.add({ jobId: id, options: { parsedTweets } });

  const normalizedTweetsForBayes = [];

  const russianTweets = [];
  const englishTweets = [];

  for (let i = 0; i < parsedTweets.length; i++) {
    const { tweetContent } = parsedTweets[i];

    const {
      text,
      language,
    }: {
      text: string;
      language: string;
    } = getTextWithAlphaOnly(tweetContent);

    switch (language) {
      case RU: {
        russianTweets.push({ text, textIndex: i });
        break;
      }

      case ENG: {
        englishTweets.push({ text, textIndex: i });
        break;
      }

      default: {
        break;
      }
    }

    normalizedTweetsForBayes.push(text);
  }

  sentimentQueue.add({
    russianTweets,
    englishTweets,
    id,
  });
  bayesQueue.add({ normalizedTweetsForAnalysis: normalizedTweetsForBayes, id });
});
