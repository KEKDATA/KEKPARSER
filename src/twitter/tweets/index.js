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
exports.getParsedTweets = async page => {
  await page.waitForSelector(constants_1.TWEET_SELECTOR);
  const tweets = [];
  for (let count = 0; count < constants_1.TWEETS_SCROLL_COUNT; count++) {
    const contentPage = await page.evaluate(
      () => document.documentElement.innerHTML,
    );
    const $ = cheerio_1.default.load(contentPage);
    const visibleTweets = [];
    $(constants_1.TWEET_SELECTOR).each((index, tweet) => {
      const textOfTweet = $(tweet).text() || '';
      visibleTweets.push(textOfTweet);
    });
    await page.evaluate(() => {
      const tweets = document.querySelectorAll('[role="article"]');
      tweets[tweets.length - 1].scrollIntoView();
    });
    tweets.push(visibleTweets);
    await helpers_1.sleep(400);
  }
  const flattedTweets = tweets.flat();
  const uniqTweets = [...new Set(flattedTweets)];
  return uniqTweets;
};
