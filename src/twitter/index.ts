import { Browser, Page } from 'puppeteer';

import { getFinalTweets } from './tweets';

export const twitterInit = async (page: Page, browser: Browser) => {
  console.time();

  const { finalTweets, meanSentiment } = await getFinalTweets(page);

  console.log('Final tweets:', finalTweets);
  console.log('Mean sentiment:', meanSentiment);

  console.timeEnd();

  await browser.close();
};
