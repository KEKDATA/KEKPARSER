import { createEffect, Effect } from 'effector';
import { chromium, devices } from 'playwright';

import { Send } from './socket';

import { setWebdriverPage } from './twitter/model';
import { setupTwitterParse } from './twitter/twitter_parse';

export const setupWebdriverFx: Effect<Send, any> = createEffect();

setupWebdriverFx.use(async (options: Send) => {
  const {
    parseTarget,
    tweetsCount,
    parseUrl,
    tweetsSettings = {},
    profileSettings = {},
  } = options;

  let settings = {};

  switch (parseTarget) {
    case 'profile': {
      settings = profileSettings;
      break;
    }

    case 'search_tweets': {
      settings = tweetsSettings;
      break;
    }

    default: {
      break;
    }
  }

  const browser = await chromium.launch({
    headless: true,
  });

  const iPhone = devices['iPhone 11 Pro'];
  const context = await browser.newContext(iPhone);

  const page = await context.newPage();

  setWebdriverPage(page);

  page.once('domcontentloaded', () => setupTwitterParse(browser));

  await page.goto(parseUrl);

  return Promise.resolve({
    parseTarget,
    tweetsCount,
    parseUrl,
    settings,
  });
});
