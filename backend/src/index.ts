import { chromium, devices } from 'playwright';
import fs from 'fs';

import { setupTwitterParse } from './twitter/twitter_parse';
import { setWebdriverPage } from './twitter/model';
import { connection, sendFx } from './socket';

const { HEADLESS_BROWSER, START_URL } = process.env;

// fs.readFile('id.json', 'utf8', (err, id) => {
//   if (err) {
//     console.error('Can not read file from parser:', err);
//     return;
//   }
//
//   connection(id);
// });

export const parseInit = async (data: any) => {
  // await sendFx({ id, target: 'parser' });

  console.log(data);

  // const browser = await chromium.launch({
  //   headless: HEADLESS_BROWSER == 'true',
  // });
  //
  // const iPhone = devices['iPhone 11 Pro'];
  // const context = await browser.newContext(iPhone);
  //
  // const page = await context.newPage();
  //
  // setWebdriverPage(page);
  //
  // page.once('domcontentloaded', () => setupTwitterParse(browser));
  //
  // await page.goto(START_URL);
};

// parseInit();
