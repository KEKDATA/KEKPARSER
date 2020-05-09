import { Page, Browser } from 'playwright';

import { getFinalTweets } from './tweets';
import { getParsedTwitterProfile } from './profile';

const { TWITTER_PARSE_TARGET } = process.env;

export const twitterInit = async (page: Page, browser: Browser) => {
  console.time();

  switch (TWITTER_PARSE_TARGET) {
    case 'profile': {
      const data = await getParsedTwitterProfile(page);

      console.log(data);
      break;
    }

    case 'tweets': {
      const { finalTweets, meanSentiment } = await getFinalTweets(page);

      console.log('Tweets length:', finalTweets.length);
      console.log('Mean sentiment:', meanSentiment);

      break;
    }

    default: {
      console.log('Цель парсинга указана не верно');
    }
  }

  console.timeEnd();

  // await browser.close();
};
