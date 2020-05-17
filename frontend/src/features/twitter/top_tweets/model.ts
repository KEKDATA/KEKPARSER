import { Store } from 'effector';

import { $socketMessage } from '../../../socket';
import { TOP_TWEETS } from '../../../constants/tweets_types';
import { getNormalizedTweetAnalyze } from '../lib/get_normalized_tweets';
import { initialStore } from '../../../constants/initial_tweets_store';
import { NormalizedTweetInfo } from '../../../types/tweets';

export const $topTweets: Store<NormalizedTweetInfo> = $socketMessage.map(
  (
    { finalTweets, meanSentiment, minCoefficient, maxCoefficient, tweetsType },
    lastState = initialStore,
  ) => {
    if (tweetsType !== TOP_TWEETS) {
      return lastState;
    }

    const normalizedTweets = {
      finalTweets,
      ...getNormalizedTweetAnalyze({
        maxCoefficient,
        minCoefficient,
        meanSentiment,
      }),
    };

    return normalizedTweets;
  },
);
