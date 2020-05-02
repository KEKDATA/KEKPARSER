'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tweets_1 = require('./tweets');
exports.twitterInit = async (page, browser) => {
  const tweets = await tweets_1.getParsedTweets(page);
  console.log('Tweets:', tweets);
  console.log('Length of tweets is:', tweets.length);
  await browser.close();
};
