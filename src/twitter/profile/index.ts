import { Page } from 'playwright';

import { LOADER_SELECTOR } from '../constants/selectors';
import { PROFILE_SELECTOR, PROFILE_TABS } from './constants/selectors';

import { checkIsTwitterContentVisible } from '../lib/page/visible_content_check';

import { getProfileInfo } from './profile_info/profile_info';
import { getFinalTweets } from '../tweets';

const PROFILE_TAB = process.env.PROFILE_TAB;

const TWEETS_TAB = 'Tweets';
const TWEETS_REPLIES_TAB = 'TweetsAndReplies';
const MEDIA = 'Media';
const LIKES = 'Likes';

export const getParsedTwitterProfile = async (page: Page) => {
  await page.waitForSelector(PROFILE_SELECTOR);

  await page.waitForFunction(checkIsTwitterContentVisible, LOADER_SELECTOR);

  const profileInfo = await getProfileInfo(page);

  let parsedTweets = {};

  switch (PROFILE_TAB) {
    case TWEETS_TAB: {
      parsedTweets = await getFinalTweets(page);
      break;
    }

    case TWEETS_REPLIES_TAB: {
      await page.click(`${PROFILE_TABS} > div:nth-child(2) > a`);
      await page.waitForSelector(PROFILE_SELECTOR);
      await page.waitForFunction(checkIsTwitterContentVisible, LOADER_SELECTOR);

      parsedTweets = await getFinalTweets(page);

      break;
    }

    case MEDIA: {
      break;
    }

    case LIKES: {
      break;
    }

    default:
      break;
  }

  return {
    profileInfo,
    ...parsedTweets,
  };
};
