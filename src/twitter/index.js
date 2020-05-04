'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tweets_1 = require('./tweets');
const helpers_1 = require('./tweets/lib/helpers');
exports.twitterInit = async (page, browser) => {
  const tweets = await tweets_1.getParsedTweets(page);
  helpers_1.getAnalyzedTweets(tweets);
  console.log('Length of tweets is:', tweets.length);
  console.timeEnd();
  await browser.close();
};
