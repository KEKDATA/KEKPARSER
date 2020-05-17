import { Store } from 'effector';

import { $socketMessage } from '../../../socket';

import { LATEST_TWEETS } from '../../../constants/tweets_types';

import { getNormalizedTweetAnalyze } from '../lib/get_normalized_tweets';
import { NormalizedTweetInfo } from '../../../types/tweets';
import { initialStore } from '../../../constants/initial_tweets_store';

export const $latestTweets: Store<NormalizedTweetInfo> = $socketMessage.map(
  (
    { finalTweets, meanSentiment, minCoefficient, maxCoefficient, tweetsType },
    lastState = initialStore,
  ) => {
    if (tweetsType !== LATEST_TWEETS) {
      return lastState;
    }

    const normalizedTweets = {
      finalTweets,
      isLoaded: true,
      ...getNormalizedTweetAnalyze({
        maxCoefficient,
        minCoefficient,
        meanSentiment,
      }),
    };

    return normalizedTweets;
  },
);
