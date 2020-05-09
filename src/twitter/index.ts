import { Page, Browser } from 'playwright';
import { getFinalTweets } from './tweets';
import { getParsedTweets } from './tweets/parsed_tweets';

export const twitterInit = async (page: Page, browser: Browser) => {
  console.time();

  await getParsedTweets(page);

  // const parsedTweets = await getParsedTweets(page);

  // const { finalTweets, meanSentiment } = await getFinalTweets(page);

  // console.log('Tweets length:', finalTweets.length);
  // console.log('Mean sentiment:', meanSentiment);

  console.timeEnd();

  await browser.close();
};
