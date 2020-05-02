'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const articles_1 = require('./articles');
exports.twitterInit = async (page, browser) => {
  const parsedArticles = await articles_1.getParsedArticles(page);
  console.log('Articles:', parsedArticles);
  console.log('Length of articles is:', parsedArticles.length);
  await browser.close();
};
