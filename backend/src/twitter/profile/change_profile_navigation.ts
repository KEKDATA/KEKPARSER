import { PROFILE_SELECTOR } from './constants/selectors';
import { LOADER_SELECTOR } from '../constants/selectors';

import { checkIsTwitterContentVisible } from '../lib/dom/visible_content_check';

import { checkIsUserAuth } from '../twitter_auth/authorization_check';
import { logIn } from '../twitter_auth/log_in';

import { $webdriverPage } from '../model';

export const changeProfileNavigation = async (
  clickSelector: string,
  authCheck: boolean,
) => {
  const page = $webdriverPage.getState();

  if (authCheck) {
    const isAuth = await checkIsUserAuth();

    if (!isAuth) {
      await logIn();
    }
  }

  await page.click(clickSelector);
  await page.waitForSelector(PROFILE_SELECTOR);
  await page.waitForFunction(checkIsTwitterContentVisible, LOADER_SELECTOR);
};
