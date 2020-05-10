import { Page } from 'playwright';

import { LOADER_SELECTOR } from '../constants/selectors';
import { PROFILE_SELECTOR } from './constants/selectors';

import { checkIsTwitterContentVisible } from '../lib/page/visible_content_check';

import { getProfileInfo } from './profile_info/profile_info';
import { getFinalTweets } from '../tweets';

export const getParsedTwitterProfile = async (page: Page) => {
  await page.waitForSelector(PROFILE_SELECTOR);

  await page.waitForFunction(checkIsTwitterContentVisible, LOADER_SELECTOR);

  const profileInfo = await getProfileInfo(page);
  const {
    finalTweets,
    meanSentiment,
    minCoefficient,
    maxCoefficient,
  } = await getFinalTweets(page);

  return {
    profileInfo,
    finalTweets,
    meanSentiment,
    minCoefficient,
    maxCoefficient,
  };
};
