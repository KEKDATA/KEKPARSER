import { createEffect } from 'effector';

import { getParsedTweets } from './parsed_tweets';
import { ParsedTweets } from '../types';

export const parsedTweetsFx = createEffect<any, any>({
  handler: async () => {
    const parsedTweets: ParsedTweets = await getParsedTweets(null);

    return Promise.resolve({ parsedTweets });
  },
});
