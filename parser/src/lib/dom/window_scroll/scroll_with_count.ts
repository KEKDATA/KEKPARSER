import { Page } from 'playwright';

import { sleep } from '../../async/sleep';

export const scrollWithCount = async (page: Page, scrollCount: number) => {
  for (let count = 0; count < scrollCount; count++) {
    await page.evaluate(() => {
      const scrollHeight = document.body.scrollHeight;

      window.scrollBy(0, scrollHeight);
    });

    await sleep(500);
  }
};
