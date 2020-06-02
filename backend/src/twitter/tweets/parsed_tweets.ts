import cheerio from 'cheerio';
import R from 'ramda';
import { Page } from 'playwright';
import { createEffect, attach } from 'effector';

import { TWEET_SELECTOR } from './constants/selectors';
import { LOADER_SELECTOR } from '../constants/selectors';

import { getHTML } from '../../lib/dom/html/get_html';
import { checkIsTwitterContentVisible } from '../lib/dom/visible_content_check';
import { scrollToLastTweet } from './lib/scroll_to_last_tweet';

import { ParsedTweets, Tweet } from '../types';

import { getTweetInfo } from './model';
import { $tweetsCount } from '../model';

const MAX_TWEETS_EQUALS = 5;

const parsedTweetsFx = createEffect<{ page: Page; tweetsCount: number }, any>({
  handler: async ({ page, tweetsCount }) => {
    await page.waitForSelector(TWEET_SELECTOR);

    let tweetsInfo: ParsedTweets = [];

    let currentLengthOfTweets: number = 0;
    let previousLengthOfTweets: number = 0;
    let countOfEqualsPrevAndCurrentTweets: number = 0;

    while (tweetsInfo.length < tweetsCount) {
      await page.waitForFunction(checkIsTwitterContentVisible, LOADER_SELECTOR);

      const contentPage: string = await page.evaluate(getHTML);

      await page.evaluate(scrollToLastTweet);

      const $ = cheerio.load(contentPage);

      $(TWEET_SELECTOR).each(async (index, tweet) => {
        const tweetNode = $(tweet);

        const tweetInfo: Tweet | null = await getTweetInfo({ tweetNode });

        if (!tweetInfo) {
          return;
        }

        tweetsInfo.push(tweetInfo);
      });

      // Присутствует вероятность того, что могут попасть дубликаты, тк список твитов
      // имеет структуру списка с виртуализацией, из-за этого пришлось обрабатывать пачками твиты
      // К тому же, ушлый твитер сделал в ленте Related searches, которые имеют идентичные атрибуты
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

    const tweetOfTheCorrectLength = tweetsInfo.slice(0, tweetsCount);

    return Promise.resolve(tweetOfTheCorrectLength);
  },
});

export const getParsedTweets = attach({
  effect: parsedTweetsFx,
  source: { tweetsCount: $tweetsCount },
  // @ts-ignore
  mapParams: (page, sources) => ({ page, tweetsCount: sources.tweetsCount }),
});
