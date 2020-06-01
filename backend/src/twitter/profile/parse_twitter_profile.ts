import { createEffect, attach } from 'effector';
import { Page } from 'playwright';

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

const parsedTwitterProfileFx = createEffect<
  { page: Page; tweetsType: string },
  any
>({
  handler: async ({ page, tweetsType }) => {
    await page.waitForSelector(PROFILE_SELECTOR);
    await page.waitForFunction(checkIsTwitterContentVisible, LOADER_SELECTOR);

    let parsedProfileTweets = {};

    try {
      switch (tweetsType) {
        case TWEETS_TAB: {
          setProfileTab(TWEETS_TAB);

          const { parsedTweets } = await parsedTweetsFx(page);
          parsedProfileTweets = parsedTweets;

          break;
        }

        case TWEETS_REPLIES_TAB: {
          setProfileTab(TWEETS_REPLIES_TAB);

          await page.click(REPLIES_LINK_SELECTOR);

          const { parsedTweets } = await parsedTweetsFx(page);
          parsedProfileTweets = parsedTweets;

          break;
        }

        case MEDIA: {
          setProfileTab(MEDIA);
          await changeProfileNavigation(MEDIA_LINK_SELECTOR, true, page);

          const { parsedTweets } = await parsedTweetsFx(page);
          parsedProfileTweets = parsedTweets;

          break;
        }

        case LIKES: {
          setProfileTab(LIKES);
          await changeProfileNavigation(LIKES_LINK_SELECTOR, true, page);

          const { parsedTweets } = await parsedTweetsFx(page);
          parsedProfileTweets = parsedTweets;

          break;
        }

        default:
          break;
      }
    } catch (err) {
      console.error('Parse twitter profile error!:', err);
    }

    return Promise.resolve({
      parsedTweets: parsedProfileTweets,
    });
  },
});

export const getParsedTwitterProfile = attach({
  effect: parsedTwitterProfileFx,
  source: { page: $webdriverPage },
  mapParams: (tweetsType: string, { page }) => ({ page, tweetsType }),
});
