import { Page } from 'puppeteer';
import cheerio from 'cheerio';

import { TWEETS_SCROLL_COUNT, TWEET_SELECTOR } from '../lib/constants';
import { sleep } from '../../lib/helpers';

export const getParsedTweets = async (page: Page) => {
  await page.waitForSelector(TWEET_SELECTOR);

  const tweets: Array<Array<string>> = [];

  for (let count = 0; count < TWEETS_SCROLL_COUNT; count++) {
    const contentPage: string = await page.evaluate(
      () => document.documentElement.innerHTML,
    );

    const $ = cheerio.load(contentPage);

    const visibleTweets: Array<string> = [];

    $(TWEET_SELECTOR).each((index, tweet) => {
      const textOfTweet = $(tweet).text() || '';
      visibleTweets.push(textOfTweet);
    });

    await page.evaluate(() => {
      const tweets = document.querySelectorAll('[role="article"]');

      tweets[tweets.length - 1].scrollIntoView();
    });

    tweets.push(visibleTweets);

    await sleep(400);
  }

  const flattedTweets: Array<string> = tweets.flat();
  const uniqTweets = [...new Set(flattedTweets)];

  return uniqTweets;
};
