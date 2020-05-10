import { LOADER_SELECTOR } from '../constants/selectors';
import {
  LIKES_LINK_SELECTOR,
  MEDIA_LINK_SELECTOR,
  PROFILE_SELECTOR,
  REPLIES_LINK_SELECTOR,
} from './constants/selectors';
import {
  LIKES,
  MEDIA,
  TWEETS_REPLIES_TAB,
  TWEETS_TAB,
} from '../constants/tabs';

import { checkIsTwitterContentVisible } from '../lib/dom/visible_content_check';

import { getProfileInfo } from './profile_info';
import { getFinalTweets } from '../tweets';
import { changeProfileNavigation } from './change_profile_navigation';

import { $webdriverPage, setProfileTab } from '../model';

const PROFILE_TAB = process.env.PROFILE_TAB;

export const getParsedTwitterProfile = async () => {
  const page = $webdriverPage.getState();

  await page.waitForSelector(PROFILE_SELECTOR);

  await page.waitForFunction(checkIsTwitterContentVisible, LOADER_SELECTOR);

  const profileInfo = await getProfileInfo();

  let parsedTweets = {};

  switch (PROFILE_TAB) {
    case TWEETS_TAB: {
      setProfileTab(TWEETS_TAB);

      parsedTweets = await getFinalTweets();

      break;
    }

    case TWEETS_REPLIES_TAB: {
      setProfileTab(TWEETS_REPLIES_TAB);

      await changeProfileNavigation(REPLIES_LINK_SELECTOR, false);

      parsedTweets = await getFinalTweets();

      break;
    }

    case MEDIA: {
      setProfileTab(MEDIA);

      await changeProfileNavigation(MEDIA_LINK_SELECTOR, true);

      parsedTweets = await getFinalTweets();

      break;
    }

    case LIKES: {
      setProfileTab(LIKES);

      await changeProfileNavigation(LIKES_LINK_SELECTOR, true);

      parsedTweets = await getFinalTweets();

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
