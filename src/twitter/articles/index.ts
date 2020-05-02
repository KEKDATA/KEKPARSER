import { Page } from 'puppeteer';
import cheerio from 'cheerio';

import { ARTICLE_SCROLL_COUNT, ARTICLE_SELECTOR } from '../lib/constants';
import { sleep } from '../../lib/helpers';

export const getParsedArticles = async (page: Page) => {
  await page.waitForSelector(ARTICLE_SELECTOR);

  const articles: Array<Array<string>> = [];

  for (let count = 0; count < ARTICLE_SCROLL_COUNT; count++) {
    const contentPage: string = await page.evaluate(
      () => document.documentElement.innerHTML,
    );

    const $ = cheerio.load(contentPage);

    const actualArticles: Array<string> = [];

    $(ARTICLE_SELECTOR).each((index, article) => {
      const textOfArticle = $(article).text() || '';
      actualArticles.push(textOfArticle);
    });

    await page.evaluate(() => {
      const articles = document.querySelectorAll('[role="article"]');

      articles[articles.length - 1].scrollIntoView();
    });

    articles.push(actualArticles);

    await sleep(400);
  }

  const flattedArticles: Array<string> = articles.flat();
  const uniqArticles = [...new Set(flattedArticles)];

  return uniqArticles;
};
