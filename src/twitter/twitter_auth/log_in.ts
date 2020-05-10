import { AUTH_PASSWORD, AUTH_NICK_NAME } from '../../../private_test_data';

import { checkIsTwitterContentVisible } from '../lib/dom/visible_content_check';

import { PROFILE_SELECTOR } from '../profile/constants/selectors';
import { LOADER_SELECTOR } from '../constants/selectors';
import {
  AUTH_NAV_SELECTOR,
  INPUT_NAME_SELECTOR,
  INPUT_PASSWORD_SELECTOR,
  LOG_IN_BUTTON_SELECTOR,
  LOG_IN_SELECTOR,
} from './constants';

import { $webdriverPage } from '../model';

export const logIn = async () => {
  const page = $webdriverPage.getState();

  await page.waitForSelector(AUTH_NAV_SELECTOR, { timeout: 1000 });
  await page.click(LOG_IN_SELECTOR);

  await page.fill(INPUT_NAME_SELECTOR, AUTH_NICK_NAME);
  await page.fill(INPUT_PASSWORD_SELECTOR, AUTH_PASSWORD);

  await page.click(LOG_IN_BUTTON_SELECTOR);

  await page.waitForSelector(PROFILE_SELECTOR);
  await page.waitForFunction(checkIsTwitterContentVisible, LOADER_SELECTOR);
};
