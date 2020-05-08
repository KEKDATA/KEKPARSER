import { Page } from 'playwright';

import { sleep } from '../../async';

export const autoScroll = async (page: Page) => {
  await page.evaluate(async () => {
    await new Promise((resolve: Function) => {
      const distance = 500;

      let totalHeight = 0;

      const timer = setInterval(() => {
        let scrollHeight = document.body.scrollHeight;

        window.scrollBy(0, distance);

        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
};

export const scrollWithCount = async (page: Page, scrollCount: number) => {
  for (let count = 0; count < scrollCount; count++) {
    await page.evaluate(() => {
      const scrollHeight = document.body.scrollHeight;

      window.scrollBy(0, scrollHeight);
    });

    await sleep(500);
  }
};

export const scrollWithDefaultYDiapason = () => {
  window.scrollBy(0, 800);
};