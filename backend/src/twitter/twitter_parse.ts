import { Browser } from 'playwright';
import { createEffect, attach, combine } from 'effector';

import {
  PROFILE_TARGET,
  SEARCH_TWEETS_TARGET,
} from './constants/type_parse_target';

import { getAnalyzedTweets } from './tweets/analyzed_tweets';
import { getParsedTwitterProfile } from './profile/parse_twitter_profile';
import { $parseTarget, $webdriverBrowser } from './model';

const twitterParseFx = createEffect<
  { browser: Browser; parseTarget: string },
  any
>({
  handler: async ({ browser, parseTarget }) => {
    console.time();

    let analyzedTwitterOptions = {};

    switch (parseTarget) {
      case PROFILE_TARGET: {
        analyzedTwitterOptions = await getParsedTwitterProfile();

        break;
      }

      case SEARCH_TWEETS_TARGET: {
        analyzedTwitterOptions = await getAnalyzedTweets(null);

        break;
      }

      default: {
        console.log('Цель анализа указана не верно');
        break;
      }
    }

    console.log('I am happy!', Object.values(analyzedTwitterOptions).length);

    console.timeEnd();

    await browser.close();
  },
});

export const createdTwitterParse = attach({
  effect: twitterParseFx,
  source: combine({
    browser: $webdriverBrowser,
    parseTarget: $parseTarget,
  }),
  mapParams: (_, { browser, parseTarget }) => ({
    browser,
    parseTarget,
  }),
});
