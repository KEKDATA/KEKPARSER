import { Browser } from 'playwright';
import { createEffect, attach, combine } from 'effector';

import {
  PROFILE_TARGET,
  SEARCH_TWEETS_TARGET,
} from './constants/type_parse_target';

import { parsedTweetsFx } from './tweets/analyzed_tweets';
import { getParsedTwitterProfile } from './profile/parse_twitter_profile';
import { $parseTarget, $webdriverBrowser } from './model';
import { ParsedTweets } from './types';

const twitterParseFx = createEffect<
  { browser: Browser; parseTarget: string; tweetsType: string },
  any
>({
  handler: async ({ browser, parseTarget, tweetsType }) => {
    let tweets = {};

    switch (parseTarget) {
      case PROFILE_TARGET: {
        const parsedProfileInfo: {
          parsedTweets: {} | ParsedTweets;
        } = await getParsedTwitterProfile(tweetsType);

        tweets = parsedProfileInfo.parsedTweets;

        break;
      }

      case SEARCH_TWEETS_TARGET: {
        const {
          parsedTweets,
        }: { parsedTweets: {} | ParsedTweets } = await parsedTweetsFx(null);
        tweets = parsedTweets;

        break;
      }

      default: {
        console.log('Цель анализа указана не верно');
        break;
      }
    }

    // await browser.close();

    return Promise.resolve({ parsedTweets: tweets });
  },
});

export const createdTwitterParse = attach({
  effect: twitterParseFx,
  source: combine({
    browser: $webdriverBrowser,
    parseTarget: $parseTarget,
  }),
  mapParams: (tweetsType: string, { browser, parseTarget }) => ({
    browser,
    parseTarget,
    tweetsType,
  }),
});
