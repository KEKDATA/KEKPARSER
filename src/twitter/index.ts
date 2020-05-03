import { Browser, Page } from 'puppeteer';

import { getParsedTweets } from './tweets';

export const twitterInit = async (page: Page, browser: Browser) => {
  const tweets = await getParsedTweets(page);

  console.log('Length of tweets is:', tweets.length);

  console.timeEnd();
  await browser.close();
};
