import { createEffect } from 'effector';
import { chromium, devices } from 'playwright';

import { ProfileSettings, Send, TweetsSettings } from './socket';
import {
  PROFILE_TARGET,
  SEARCH_TWEETS_TARGET,
} from './twitter/constants/type_parse_target';

export const setupWebdriverFx = createEffect<{ options: Send }, any>({
  handler: async ({ options }) => {
    const {
      parseTarget,
      tweetsCount,
      parseUrl,
      tweetsSettings = {},
      profileSettings = {},
    } = options;

    let settings: ProfileSettings | TweetsSettings | {} = {};

    switch (parseTarget) {
      case PROFILE_TARGET: {
        settings = profileSettings;
        break;
      }

      case SEARCH_TWEETS_TARGET: {
        settings = tweetsSettings;
        break;
      }

      default: {
        break;
      }
    }

    const browser = await chromium.launch({
      headless: false,
    });

    const iPhone = devices['iPhone 11 Pro'];
    const context = await browser.newContext(iPhone);

    const page = await context.newPage();

    await page.goto(parseUrl);

    return Promise.resolve({
      parseTarget,
      tweetsCount,
      page,
      browser,
    });
  },
});
