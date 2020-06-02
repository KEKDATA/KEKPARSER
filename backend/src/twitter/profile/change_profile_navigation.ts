import { Page } from 'playwright';

import { PROFILE_SELECTOR } from './constants/selectors';
import { LOADER_SELECTOR } from '../constants/selectors';

import { checkIsTwitterContentVisible } from '../lib/dom/visible_content_check';

import { checkIsUserAuth } from '../twitter_auth/authorization_check';
import { logIn } from '../twitter_auth/log_in';

export const changeProfileNavigation = async (
  clickSelector: string,
  authCheck: boolean,
  page: Page,
) => {
  if (authCheck) {
    const isAuth = await checkIsUserAuth();

    if (!isAuth) {
      await logIn({ page });
    }
  }

  await page.click(clickSelector);
  await page.waitForSelector(PROFILE_SELECTOR);
  await page.waitForFunction(checkIsTwitterContentVisible, LOADER_SELECTOR);
};
