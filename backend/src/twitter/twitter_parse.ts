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
    console.time();

    let tweets = {};
    let profileInfo = {};

    switch (parseTarget) {
      case PROFILE_TARGET: {
        const parsedProfileInfo: {
          profileInfo: {
            sentimentCoefficient: number | null;
            contactInfo: Array<string>;
            classifierData: string | null;
            name: string;
            tweetName: string;
            description: string;
            activityInfo: Array<string>;
          };
          parsedTweets: {} | ParsedTweets;
        } = await getParsedTwitterProfile(tweetsType);

        tweets = parsedProfileInfo.parsedTweets;
        profileInfo = parsedProfileInfo.profileInfo;

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

    console.timeEnd();

    await browser.close();

    return Promise.resolve({ parsedTweets: tweets, profileInfo });
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
