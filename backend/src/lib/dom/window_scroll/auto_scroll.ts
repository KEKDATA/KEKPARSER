import { Page } from 'playwright';

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
