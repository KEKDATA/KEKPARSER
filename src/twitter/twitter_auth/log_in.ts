import { AUTH_PASSWORD, AUTH_NICK_NAME } from '../../../private_test_data';

import { checkIsTwitterContentVisible } from '../lib/dom/visible_content_check';

import { PROFILE_SELECTOR } from '../profile/constants/selectors';
import { LOADER_SELECTOR } from '../constants/selectors';

import { $webdriverPage } from '../model';

export const logIn = async () => {
  const page = $webdriverPage.getState();

  await page.waitForSelector(
    '.css-1dbjc4n.r-1awozwy.r-1pz39u2.r-18u37iz.r-16y2uox',
    { timeout: 1000 },
  );
  await page.click(
    '.css-1dbjc4n.r-1awozwy.r-1pz39u2.r-18u37iz.r-16y2uox > div > a',
  );

  await page.fill(
    '[name="session[username_or_email]"].r-30o5oe',
    AUTH_NICK_NAME,
  );
  await page.fill('[name="session[password]"].r-30o5oe', AUTH_PASSWORD);

  await page.click('[data-testid="LoginForm_Login_Button"]');

  await page.waitForSelector(PROFILE_SELECTOR);
  await page.waitForFunction(checkIsTwitterContentVisible, LOADER_SELECTOR);
};
