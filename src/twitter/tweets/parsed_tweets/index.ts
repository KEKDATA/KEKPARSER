import { Page } from 'playwright';
import cheerio from 'cheerio';

import { TWEET_SELECTOR } from '../constants/selectors';
import { Tweet } from '../types';
import { getTweetInfo, getTweetUploadStatus } from '../helpers';
import { getHTML } from '../../../lib/dom/html';

const TWEETS_COUNT = Number(process.env.TWEETS_COUNT);

export const getParsedTweets = async (page: Page) => {
  await page.waitForSelector(TWEET_SELECTOR);

  let tweetsInfo: Array<Tweet> = [];

  while (tweetsInfo.length < TWEETS_COUNT) {
    await page.waitForFunction(getTweetUploadStatus);

    const tweetIndex = await page.evaluate(() => {
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

      const tweetsNodes = Array.from(
        document.querySelectorAll(
          '[aria-label="Timeline: Search timeline"] > div > div',
        ),
      );

      let visibleTweetIndex = null;

      for (let i = 0; i < tweetsNodes.length; i++) {
        const tweetNode = tweetsNodes[i];

        const availableTweetNode = tweetNode.querySelector(
          '[data-testid="tweet"]',
        );

        if (!availableTweetNode) {
          continue;
        }

        const isElementInViewport = getIsElementInViewport(tweetNode);

        if (!isElementInViewport) {
          continue;
        }

        const indexForNextNode = i + 1;
        const availableNextTweetNode = tweetsNodes
          .slice(indexForNextNode)
          .find(
            nextNode =>
              nextNode && nextNode.querySelector('[data-testid="tweet"]'),
          );

        if (availableNextTweetNode) {
          visibleTweetIndex = i + 1;
          availableNextTweetNode.scrollIntoView();
          break;
        }
      }

      if (!visibleTweetIndex) {
        window.scrollBy(0, 100);
      }

      return Promise.resolve(visibleTweetIndex);
    });

    if (!tweetIndex) {
      continue;
    }

    const contentPage: string = await page.evaluate(getHTML);

    // await page.evaluate(scrollToLastTweet);

    const $ = cheerio.load(contentPage);

    const visibleTweet = $(TWEET_SELECTOR).eq(tweetIndex);

    const tweetNode = $(visibleTweet);

    const tweetInfo = getTweetInfo(tweetNode);

    if (tweetInfo.userName) {
      tweetsInfo.push(tweetInfo);
    }
  }

  console.log(tweetsInfo, tweetsInfo.length);

  return tweetsInfo;
};
