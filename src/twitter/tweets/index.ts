import { Page } from 'puppeteer';
import cheerio from 'cheerio';
import R from 'ramda';

import { TWEETS_COUNT, MAX_TWEETS_EQUALS } from './lib/constants';

import {
  getTweetInfo,
  getTweetUploadStatus,
  scrollToLastTweet,
} from './lib/helpers';
import { getHTML, scrollWithDefaultYDiapason } from '../../lib/helpers';

import { TWEET_SELECTOR } from './lib/selectors';

import { Tweet } from './types';

export const getParsedTweets = async (page: Page) => {
  await page.waitForSelector(TWEET_SELECTOR);

  let tweetsInfo: Array<Tweet> = [];

  let currentLengthOfTweets: number = 0;
  let previousLengthOfTweets: number = 0;
  let countOfEqualsPrevAndCurrentTweets: number = 0;

  while (tweetsInfo.length < TWEETS_COUNT) {
    await page.waitFor(getTweetUploadStatus);

    const contentPage: string = await page.evaluate(getHTML);

    await page.evaluate(scrollToLastTweet);

    const $ = cheerio.load(contentPage);

    $(TWEET_SELECTOR).each((index, tweet) => {
      const tweetNode = $(tweet);

      const tweetInfo = getTweetInfo(tweetNode);

      tweetsInfo.push(tweetInfo);
    });

    await page.evaluate(scrollWithDefaultYDiapason);

    // Присутствует вероятность того, что могут попасть дубликаты, тк список твитов
    // имеет структуру списка с виртуализацией, из-за этого пришлось обрабатывать пачками твиты
    const uniqTweets = R.uniq(tweetsInfo);

    tweetsInfo = [...uniqTweets];

    currentLengthOfTweets = tweetsInfo.length;

    // Если твиты закончились по запросу
    const isTweetsLengthEquals =
      currentLengthOfTweets === previousLengthOfTweets;

    // Существует вероятность, при которой длина предыдущих и текущих твитов совпадает
    // Если мы уходим в цикл с одинаковой длинной предыдущих и текущих, то допускаем
    // выход из цикла при условии, что MAX_TWEETS_EQUALS раз предыдущая длинна и текущая
    // были равны
    if (countOfEqualsPrevAndCurrentTweets > MAX_TWEETS_EQUALS) {
      break;
    }

    countOfEqualsPrevAndCurrentTweets = isTweetsLengthEquals
      ? countOfEqualsPrevAndCurrentTweets + 1
      : 0;

    previousLengthOfTweets = tweetsInfo.length;
  }

  const tweetOfTheCorrectLength = tweetsInfo.slice(0, TWEETS_COUNT);

  return tweetOfTheCorrectLength;
};
