import Queue from 'bull';

import { setupWebdriverFx } from '../webdriver';

import { getTextWithAlphaOnly } from '../lib/normalizers/alphabet';

import { createdTwitterParse } from '../twitter/twitter_parse';
import { Tweet } from '../twitter/types';

console.info('Parser connected');

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

const parserQueue = new Queue('parser', options);
const sentimentQueue = new Queue('sentiment', options);
const bayesQueue = new Queue('bayes', options);
const callbackQueue = new Queue('callback', options);

const maxJobsPerWorker = 10;

parserQueue.process(maxJobsPerWorker, async job => {
  const { id, options } = job.data;

  await setupWebdriverFx({ options });
  const {
    parsedTweets,
  }: { parsedTweets: Array<Tweet> } = await createdTwitterParse(null);

  callbackQueue.add({ jobId: id, options: { parsedTweets } });

  const normalizedTweetsForAnalysis = parsedTweets.map(({ tweetContent }) => {
    const tweetWithAlphaOnly = getTextWithAlphaOnly(tweetContent);

    return tweetWithAlphaOnly;
  });

  sentimentQueue.add({ normalizedTweetsForAnalysis, id });
  bayesQueue.add({ normalizedTweetsForAnalysis, id });
});
