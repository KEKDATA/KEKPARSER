import { chromium } from 'playwright';

import { twitterInit } from './twitter';
import { BROWSER_URL, HEADLESS_BROWSER, VIEWPORT_OPTIONS } from './constants';

const parseInit = async () => {
  const browser = await chromium.launch({ headless: HEADLESS_BROWSER });
  const context = await browser.newContext();
  const page = await context.newPage();

  page.once('domcontentloaded', () => twitterInit(page, browser));

  await page.setViewportSize(VIEWPORT_OPTIONS);
  await page.goto(BROWSER_URL);
};

parseInit();
