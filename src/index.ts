import { chromium, devices } from 'playwright';

import { twitterInit } from './twitter';

const { HEADLESS_BROWSER, START_URL } = process.env;

const parseInit = async () => {
  const browser = await chromium.launch({
    headless: HEADLESS_BROWSER == 'true',
  });

  const iPhone = devices['iPhone 11 Pro'];
  const context = await browser.newContext(iPhone);

  const page = await context.newPage();

  page.once('domcontentloaded', () => twitterInit(page, browser));

  await page.goto(START_URL);
};

parseInit();
