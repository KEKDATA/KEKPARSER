import { Browser, Page } from 'puppeteer';

import { getParsedTweets } from './tweets';

export const twitterInit = async (page: Page, browser: Browser) => {
  const tweets = await getParsedTweets(page);

  console.log('Tweets:', tweets);
  console.log('Length of tweets is:', tweets.length);

  await browser.close();
};
