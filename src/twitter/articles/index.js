'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const cheerio_1 = __importDefault(require('cheerio'));
const constants_1 = require('../lib/constants');
const helpers_1 = require('../../lib/helpers');
exports.getParsedArticles = async page => {
  await page.waitForSelector(constants_1.ARTICLE_SELECTOR);
  const articles = [];
  for (let count = 0; count < constants_1.ARTICLE_SCROLL_COUNT; count++) {
    const contentPage = await page.evaluate(
      () => document.documentElement.innerHTML,
    );
    const $ = cheerio_1.default.load(contentPage);
    const actualArticles = [];
    $(constants_1.ARTICLE_SELECTOR).each((index, article) => {
      const textOfArticle = $(article).text() || '';
      actualArticles.push(textOfArticle);
    });
    await page.evaluate(() => {
      const articles = document.querySelectorAll('[role="article"]');
      articles[articles.length - 1].scrollIntoView();
    });
    articles.push(actualArticles);
    await helpers_1.sleep(400);
  }
  const flattedArticles = articles.flat();
  const uniqArticles = [...new Set(flattedArticles)];
  return uniqArticles;
};
