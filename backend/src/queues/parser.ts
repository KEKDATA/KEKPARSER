import Queue from 'bull';

import { setupWebdriverFx } from '../webdriver';

import { getTextWithAlphaOnly } from '../lib/normalizers/alphabet';

import { createdTwitterParse } from '../twitter/twitter_parse';
import { ParsedTweets } from '../twitter/types';

import { OPTIONS, MAX_JOBS_PER_WORKER } from './config';

console.info('Parser connected');

const parserQueue = new Queue('parser', OPTIONS);
const sentimentQueue = new Queue('sentiment', OPTIONS);
const bayesQueue = new Queue('bayes', OPTIONS);
const callbackQueue = new Queue('callback', OPTIONS);

parserQueue.process(MAX_JOBS_PER_WORKER, async job => {
  const { id, options, tweetsType } = job.data;

  await setupWebdriverFx({ options });
  const {
    parsedTweets,
  }: { parsedTweets: ParsedTweets } = await createdTwitterParse(tweetsType);

  callbackQueue.add({ jobId: id, options: { parsedTweets } });

  const normalizedTweetsForAnalysis = parsedTweets.map(({ tweetContent }) => {
    const tweetWithAlphaOnly = getTextWithAlphaOnly(tweetContent);

    return tweetWithAlphaOnly;
  });

  sentimentQueue.add({ normalizedTweetsForAnalysis, id });
  bayesQueue.add({ normalizedTweetsForAnalysis, id });
});
