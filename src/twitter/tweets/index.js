'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const cheerio_1 = __importDefault(require('cheerio'));
const ramda_1 = __importDefault(require('ramda'));
const constants_1 = require('../lib/constants');
const helpers_1 = require('../../lib/helpers');
const helpers_2 = require('../lib/helpers');
exports.getParsedTweets = async page => {
  await page.waitForSelector(constants_1.TWEET_SELECTOR);
  const tweetsInfo = [];
  for (let count = 0; count < constants_1.TWEETS_SCROLL_COUNT; count++) {
    const contentPage = await page.evaluate(
      () => document.documentElement.innerHTML,
    );
    await page.evaluate(() => {
      const tweets = document.querySelectorAll('[role="article"]');
      tweets[tweets.length - 1].scrollIntoView();
    });
    const $ = cheerio_1.default.load(contentPage);
    $(constants_1.TWEET_SELECTOR).each((index, tweet) => {
      const tweetNode = $(tweet);
      const tweetInfo = helpers_2.getTweetInfo(tweetNode);
      tweetsInfo.push(tweetInfo);
    });
    await page.evaluate(() => {
      window.scrollBy(0, 800);
    });
    await helpers_1.sleep(400);
  }
  const uniqTweets = ramda_1.default.uniq(tweetsInfo);
  return uniqTweets;
};
