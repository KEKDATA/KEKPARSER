import { createEffect } from 'effector';
import { Page } from 'playwright';

import { getParsedTweets } from './parsed_tweets';
import { ParsedTweets } from '../types';

export const parsedTweetsFx = createEffect<Page, any>({
  handler: async page => {
    const parsedTweets: ParsedTweets = await getParsedTweets(page);

    return Promise.resolve({ parsedTweets });
  },
});
