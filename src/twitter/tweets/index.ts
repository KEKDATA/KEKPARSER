import { Page } from 'puppeteer';
import cheerio from 'cheerio';
import R from 'ramda';

import { TWEETS_SCROLL_COUNT, TWEET_SELECTOR } from '../lib/constants';
import { sleep } from '../../lib/helpers';
import { getTweetInfo } from '../lib/helpers';

export const getParsedTweets = async (page: Page) => {
  await page.waitForSelector(TWEET_SELECTOR);

  const tweetsInfo: Array<{ userName: string; tweetContent: string }> = [];

  for (let count = 0; count < TWEETS_SCROLL_COUNT; count++) {
    const contentPage: string = await page.evaluate(
      () => document.documentElement.innerHTML,
    );

    await page.evaluate(() => {
      const tweets = document.querySelectorAll('[role="article"]');

      tweets[tweets.length - 1].scrollIntoView();
    });

    const $ = cheerio.load(contentPage);

    $(TWEET_SELECTOR).each((index, tweet) => {
      const tweetNode = $(tweet);

      const tweetInfo = getTweetInfo(tweetNode);

      tweetsInfo.push(tweetInfo);
    });

    await page.evaluate(() => {
      window.scrollBy(0, 800);
    });

    await sleep(400);
  }

  const uniqTweets = R.uniq(tweetsInfo);

  return uniqTweets;
};
