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

import { parsedTweetsFx } from '../tweets/analyzed_tweets';
import { changeProfileNavigation } from './change_profile_navigation';

import { $webdriverPage, setProfileTab } from '../model';

export const getParsedTwitterProfile = async (tweetsType: string) => {
  const page = $webdriverPage.getState();

  await page.waitForSelector(PROFILE_SELECTOR);
  await page.waitForFunction(checkIsTwitterContentVisible, LOADER_SELECTOR);

  let parsedProfileTweets = {};

  switch (tweetsType) {
    case TWEETS_TAB: {
      setProfileTab(TWEETS_TAB);

      const { parsedTweets } = await parsedTweetsFx(null);
      parsedProfileTweets = parsedTweets;

      break;
    }

    case TWEETS_REPLIES_TAB: {
      setProfileTab(TWEETS_REPLIES_TAB);

      await changeProfileNavigation(REPLIES_LINK_SELECTOR, false);

      const { parsedTweets } = await parsedTweetsFx(null);
      parsedProfileTweets = parsedTweets;

      break;
    }

    case MEDIA: {
      setProfileTab(MEDIA);

      await changeProfileNavigation(MEDIA_LINK_SELECTOR, true);

      const { parsedTweets } = await parsedTweetsFx(null);
      parsedProfileTweets = parsedTweets;

      break;
    }

    case LIKES: {
      setProfileTab(LIKES);

      await changeProfileNavigation(LIKES_LINK_SELECTOR, true);

      const { parsedTweets } = await parsedTweetsFx(null);
      parsedProfileTweets = parsedTweets;

      break;
    }

    default:
      break;
  }

  return {
    parsedTweets: parsedProfileTweets,
  };
};
