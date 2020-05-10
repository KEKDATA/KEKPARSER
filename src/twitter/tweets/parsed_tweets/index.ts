import { Page } from 'playwright';
import cheerio from 'cheerio';
import R from 'ramda';

import { TWEET_SELECTOR } from '../constants/selectors';
import { LOADER_SELECTOR } from '../../constants/selectors';

import { getTweetInfo } from '../lib/tweet_info';
import { getHTML } from '../../../lib/dom/html';
import { checkIsTwitterContentVisible } from '../../lib/page/visible_content_check';
import { scrollToLastTweet } from '../lib/scroll_to_last_tweet';

import { $profileTab } from '../../model';

import { Tweet } from '../types';

const TWEETS_COUNT = Number(process.env.TWEETS_COUNT);
const MAX_TWEETS_EQUALS = 5;

export const getParsedTweets = async (page: Page) => {
  await page.waitForSelector(TWEET_SELECTOR);

  let tweetsInfo: Array<Tweet> = [];

  let currentLengthOfTweets: number = 0;
  let previousLengthOfTweets: number = 0;
  let countOfEqualsPrevAndCurrentTweets: number = 0;

  const profileTabType = $profileTab.getState();

  while (tweetsInfo.length < TWEETS_COUNT) {
    await page.waitForFunction(checkIsTwitterContentVisible, LOADER_SELECTOR);

    const contentPage: string = await page.evaluate(getHTML);

    await page.evaluate(scrollToLastTweet);

    const $ = cheerio.load(contentPage);

    $(TWEET_SELECTOR).each((index, tweet) => {
      const tweetNode = $(tweet);

      const tweetInfo = getTweetInfo(tweetNode, profileTabType);

      tweetsInfo.push(tweetInfo);
    });

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
