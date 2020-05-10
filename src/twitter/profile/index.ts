import { Page } from 'playwright';

import { LOADER_SELECTOR } from '../constants/selectors';
import { PROFILE_SELECTOR, PROFILE_TABS } from './constants/selectors';

import { checkIsTwitterContentVisible } from '../lib/page/visible_content_check';

import { getProfileInfo } from './profile_info/profile_info';
import { getFinalTweets } from '../tweets';
import { setProfileTab } from '../model';
import {
  LIKES,
  MEDIA,
  TWEETS_REPLIES_TAB,
  TWEETS_TAB,
} from '../constants/tabs';

const PROFILE_TAB = process.env.PROFILE_TAB;

export const getParsedTwitterProfile = async (page: Page) => {
  await page.waitForSelector(PROFILE_SELECTOR);

  await page.waitForFunction(checkIsTwitterContentVisible, LOADER_SELECTOR);

  const profileInfo = await getProfileInfo(page);

  let parsedTweets = {};

  switch (PROFILE_TAB) {
    case TWEETS_TAB: {
      setProfileTab(TWEETS_TAB);

      parsedTweets = await getFinalTweets(page);

      break;
    }

    case TWEETS_REPLIES_TAB: {
      setProfileTab(TWEETS_REPLIES_TAB);

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
