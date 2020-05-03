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
const helpers_1 = require('../lib/helpers');
const helpers_2 = require('../../lib/helpers');
exports.getParsedTweets = async page => {
  await page.waitForSelector(constants_1.TWEET_SELECTOR);
  let tweetsInfo = [];
  let currentLengthOfTweets = 0;
  let previousLengthOfTweets = 0;
  let countOfEqualsPrevAndCurrentTweets = 0;
  while (tweetsInfo.length < constants_1.TWEETS_COUNT) {
    await page.waitFor(helpers_1.getTweetUploadStatus);
    const contentPage = await page.evaluate(helpers_2.getHTML);
    await page.evaluate(helpers_1.scrollToLastTweet);
    const $ = cheerio_1.default.load(contentPage);
    $(constants_1.TWEET_SELECTOR).each((index, tweet) => {
      const tweetNode = $(tweet);
      const tweetInfo = helpers_1.getTweetInfo(tweetNode);
      tweetsInfo.push(tweetInfo);
    });
    await page.evaluate(helpers_2.scrollWithDefaultYDiapason);
    // Присутствует вероятность того, что могут попасть дубликаты, тк список твитов
    // имеет структуру списка с виртуализацией, из-за этого пришлось обрабатывать пачками твиты
    const uniqTweets = ramda_1.default.uniq(tweetsInfo);
    tweetsInfo = [...uniqTweets];
    currentLengthOfTweets = tweetsInfo.length;
    // Если твиты закончились по запросу
    const isTweetsLengthEquals =
      currentLengthOfTweets === previousLengthOfTweets;
    // Существует вероятность, при которой длина предыдущих и текущих твитов совпадает
    // Если мы уходим в цикл с одинаковой длинной предыдущих и текущих, то допускаем
    // выход из цикла при условии, что MAX_TWEETS_EQUALS раз предыдущая длинна и текущая
    // были равны
    if (countOfEqualsPrevAndCurrentTweets > constants_1.MAX_TWEETS_EQUALS) {
      break;
    }
    countOfEqualsPrevAndCurrentTweets = isTweetsLengthEquals
      ? countOfEqualsPrevAndCurrentTweets + 1
      : 0;
    previousLengthOfTweets = tweetsInfo.length;
  }
  return tweetsInfo;
};
