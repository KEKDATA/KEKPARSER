import puppeteer from 'puppeteer';

import { twitterInit } from './twitter';
import {
  BROWSER_URL,
  HEADLESS_BROWSER,
  VIEWPORT_OPTIONS,
} from './lib/constants';

const pupeteerInit = async () => {
  const browser = await puppeteer.launch({ headless: HEADLESS_BROWSER });
  const context = await browser.createIncognitoBrowserContext();
  const page = await context.newPage();

  page.once('domcontentloaded', () => twitterInit(page, browser));

  await page.setViewport(VIEWPORT_OPTIONS);
  await page.goto(BROWSER_URL);
};

pupeteerInit();
