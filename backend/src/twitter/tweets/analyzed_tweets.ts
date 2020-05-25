import { createEffect } from 'effector';

import { getParsedTweets } from './parsed_tweets';
import { Tweet } from '../types';

export const parsedTweetsFx = createEffect<any, any>({
  handler: async () => {
    const parsedTweets: Array<Tweet> = await getParsedTweets(null);

    return Promise.resolve({ parsedTweets });
  },
});
