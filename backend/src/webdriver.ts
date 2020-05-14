import {
  createEvent,
  createStore,
  createEffect,
  Event,
  Effect,
} from 'effector';

import { Send } from '../socket';
import { chromium, devices } from 'playwright';
import { setWebdriverPage } from '../twitter/model';
import { setupTwitterParse } from '../twitter/twitter_parse';

export const $parseTarget = createStore<string>('');
export const $tweetsCount = createStore<number>(0);
export const $parseUrl = createStore<string>('');
export const $settings = createStore<string>('');

export const parseTargetAdded: Event<string> = createEvent();
export const tweetsCountAdded: Event<number> = createEvent();
export const parseUrlAdded: Event<string> = createEvent();
export const settingsAdded: Event<string> = createEvent();

$parseTarget.on(parseTargetAdded, (_, parseTarget) => parseTarget);
$tweetsCount.on(tweetsCountAdded, (_, tweetsCount) => tweetsCount);
$parseUrl.on(parseUrlAdded, (_, parseUrl) => parseUrl);
$settings.on(settingsAdded, (_, settings) => settings);

export const setupWebdriverFx: Effect<Send, any> = createEffect();

setupWebdriverFx.use(async (options: Send) => {
  const {
    parseTarget,
    tweetsCount,
    parseUrl,
    tweetsSettings,
    profileSettings,
  } = options;

  const browser = await chromium.launch({
    headless: true,
  });

  const iPhone = devices['iPhone 11 Pro'];
  const context = await browser.newContext(iPhone);

  const page = await context.newPage();

  setWebdriverPage(page);

  page.once('domcontentloaded', () => setupTwitterParse(browser));

  await page.goto(parseUrl);
});
