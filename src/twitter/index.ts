import { Browser, Page } from 'puppeteer';

import { getParsedTweets } from './tweets';
import {
  getTweetsBayesClassifier,
  getTweetsSentiments,
} from './tweets/helpers';

export const twitterInit = async (page: Page, browser: Browser) => {
  console.time();
  const tweets = await getParsedTweets(page);

  getTweetsSentiments(tweets);
  getTweetsBayesClassifier(tweets);

  console.log('Length of tweets is:', tweets.length);

  await browser.close();
};
