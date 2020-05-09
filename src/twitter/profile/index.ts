import { Page } from 'playwright';

import { LOADER_SELECTOR } from '../constants/selectors';
import { PROFILE_SELECTOR } from './constants/selectors';

import { checkIsTwitterContentVisible } from '../lib/page/visible_content_check';

import { getParsedTweets } from '../tweets/parsed_tweets';
import { getProfileInfo } from './profile_info/profile_info';

export const getParsedTwitterProfile = async (page: Page) => {
  await page.waitForSelector(PROFILE_SELECTOR);

  await page.waitForFunction(checkIsTwitterContentVisible, LOADER_SELECTOR);

  const profileInfo = await getProfileInfo(page);
  const tweets = await getParsedTweets(page);

  return {
    profileInfo,
    tweets,
  };
};
