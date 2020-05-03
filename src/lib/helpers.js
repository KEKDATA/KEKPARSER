'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
exports.autoScroll = async page => {
  await page.evaluate(async () => {
    await new Promise(resolve => {
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
exports.scrollWithCount = async (page, scrollCount) => {
  for (let count = 0; count < scrollCount; count++) {
    await page.evaluate(() => {
      const scrollHeight = document.body.scrollHeight;
      window.scrollBy(0, scrollHeight);
    });
    await exports.sleep(500);
  }
};
exports.getTextOfChildNode = (parentNode, childNode) =>
  parentNode.find(childNode).text();
exports.getNormalizedThousandthValue = value => {
  let normalizedValue = Number(value);
  if (value.includes('K')) {
    const valueWithoutKFormat = Number(value.replace('K', ''));
    normalizedValue = valueWithoutKFormat * 1000;
  }
  return normalizedValue;
};
exports.getHTML = () => document.documentElement.innerHTML;
exports.scrollWithDefaultYDiapason = () => {
  window.scrollBy(0, 800);
};
