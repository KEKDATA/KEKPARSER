// TODO: Доработать парсинг твитов по 1
/* eslint no-use-before-define: 0 */
// @ts-ignore-file
// @ts-nocheck

import { Page } from 'puppeteer';
import cheerio from 'cheerio';

import { TWEET_SELECTOR } from '../helpers/constants';
import { getTweetInfo } from '../helpers/helpers';
import { sleep } from '../src/lib/async';

import { Tweet } from '../types';

const TWEETS = 20;

export const getParsedTweets = async (page: Page) => {
  await page.waitForSelector(TWEET_SELECTOR);

  const tweetsInfo: Array<Tweet> = [];

  let count = 0;

  while (count < TWEETS) {
    const contentPage: string = await page.evaluate(
      () => document.documentElement.innerHTML,
    );

    const visibleTweetIndex = await page.evaluate(() => {
      const bannerNode = document.querySelector('[role="banner"]');

      let bannerHeight = 0;
      if (bannerNode) {
        bannerHeight = Number(bannerNode.getBoundingClientRect().height);
      }

      //@ts-ignore
      function getIsElementInViewport(el) {
        const rect = el.getBoundingClientRect();

        return (
          Number(rect.top) + bannerHeight >= 0 &&
          rect.left >= 0 &&
          rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <=
            (window.innerWidth || document.documentElement.clientWidth)
        );
      }

      function getActualTweetIndex() {
        const tweetsNodes = document.querySelectorAll(
          '[aria-label="Timeline: Search timeline"] > div > div',
        );

        let actualTweetIndex = 0;
        let isAvailable = false;

        // FIXME: Не высчитывает в любых случаях 2 итерируемый селектор
        for (let i = 0; i < tweetsNodes.length; i++) {
          const tweetNode = tweetsNodes[i];

          if (tweetNode.querySelector('[data-testid="tweet"]')) {
            const isElementInViewport = getIsElementInViewport(tweetNode);

            if (isElementInViewport) {
              let availableNextNode = null;

              for (let j = i; j < tweetsNodes.length - i; j++) {
                const nextNode = tweetsNodes[i + 1];

                if (
                  nextNode &&
                  nextNode.querySelector('[data-testid="tweet"]')
                ) {
                  availableNextNode = nextNode;
                  break;
                }
              }

              if (availableNextNode) {
                //@ts-ignore
                tweetNode.nextSibling.scrollIntoView();
                actualTweetIndex = i;
                isAvailable = true;
                break;
              }
            }
          }
        }

        if (!isAvailable) {
          window.scrollBy(0, 500);
        }

        return actualTweetIndex;
      }

      return getActualTweetIndex();
    });

    const $ = cheerio.load(contentPage);

    const firstVisibleTweet = $(TWEET_SELECTOR).eq(visibleTweetIndex);

    const tweetNode = $(firstVisibleTweet);

    const tweetInfo = getTweetInfo(tweetNode);

    tweetsInfo.push(tweetInfo);

    count++;

    await sleep(300);
  }

  return tweetsInfo;
};
