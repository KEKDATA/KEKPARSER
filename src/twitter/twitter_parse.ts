import { Browser } from 'playwright';

import { PROFILE_TARGET, TWEETS_TARGET } from './constants/type_parse_target';

import { getAnalyzedTweets } from './tweets/analyzed_tweets';
import { getParsedTwitterProfile } from './profile/parse_twitter_profile';

const { TWITTER_PARSE_TARGET } = process.env;

export const setupTwitterParse = async (browser: Browser) => {
  console.time();

  let analyzedTwitterOptions = {};

  switch (TWITTER_PARSE_TARGET) {
    case PROFILE_TARGET: {
      analyzedTwitterOptions = await getParsedTwitterProfile();

      break;
    }

    case TWEETS_TARGET: {
      analyzedTwitterOptions = await getAnalyzedTweets();

      break;
    }

    default: {
      console.log('Цель анализа указана не верно');
      break;
    }
  }

  console.log(analyzedTwitterOptions);

  console.timeEnd();

  await browser.close();
};
