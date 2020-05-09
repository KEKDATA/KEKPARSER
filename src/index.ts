import { chromium } from 'playwright';

import { twitterInit } from './twitter';

const {
  HEADLESS_BROWSER,
  START_URL,
  VIEWPORT_WIDTH,
  VIEWPORT_HEIGHT,
} = process.env;

const parseInit = async () => {
  const browser = await chromium.launch({
    headless: HEADLESS_BROWSER == 'true',
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  page.once('domcontentloaded', () => twitterInit(page, browser));

  await page.setViewportSize({
    width: Number(VIEWPORT_WIDTH),
    height: Number(VIEWPORT_HEIGHT),
  });
  await page.goto(START_URL);
};

parseInit();
