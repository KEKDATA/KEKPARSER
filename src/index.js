'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const puppeteer_1 = __importDefault(require('puppeteer'));
const twitter_1 = require('./twitter');
const constants_1 = require('./lib/constants');
const pupeteerInit = async () => {
  const browser = await puppeteer_1.default.launch({
    headless: constants_1.HEADLESS_BROWSER,
  });
  const context = await browser.createIncognitoBrowserContext();
  const page = await context.newPage();
  page.once('domcontentloaded', () => twitter_1.twitterInit(page, browser));
  await page.setViewport(constants_1.VIEWPORT_OPTIONS);
  await page.goto(constants_1.BROWSER_URL);
};
pupeteerInit();
