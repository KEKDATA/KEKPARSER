import { Browser, Page } from 'puppeteer';

import { getParsedArticles } from './articles';

export const twitterInit = async (page: Page, browser: Browser) => {
  const parsedArticles = await getParsedArticles(page);

  console.log('Articles:', parsedArticles);
  console.log('Length of articles is:', parsedArticles.length);

  await browser.close();
};
