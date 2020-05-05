import { Browser, Page } from 'puppeteer';

import { getParsedTweets } from './tweets';
import { getAnalyzedTweets } from './tweets/lib/helpers';

export const twitterInit = async (page: Page, browser: Browser) => {
  const tweets = await getParsedTweets(page);

  getAnalyzedTweets(tweets);

  console.log('Length of tweets is:', tweets.length);

  await browser.close();
};
