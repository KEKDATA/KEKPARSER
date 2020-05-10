import { chromium, devices } from 'playwright';

import { setupTwitterParse } from './twitter/twitter_parse';
import { setWebdriverPage } from './twitter/model';

const { HEADLESS_BROWSER, START_URL } = process.env;

const parseInit = async () => {
  const browser = await chromium.launch({
    headless: HEADLESS_BROWSER == 'true',
  });

  const iPhone = devices['iPhone 11 Pro'];
  const context = await browser.newContext(iPhone);

  const page = await context.newPage();

  setWebdriverPage(page);

  page.once('domcontentloaded', () => setupTwitterParse(browser));

  await page.goto(START_URL);
};

parseInit();
