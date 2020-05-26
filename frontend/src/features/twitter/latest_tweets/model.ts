import { Store, createStore, combine } from 'effector';

import { $socketMessage, sendFx } from '../../../socket';

import { LATEST_TWEETS } from '../../../constants/tweets_types';

import { getNormalizedTweetAnalyze } from '../lib/get_normalized_tweets';
import { NormalizedTweetInfo } from '../../../types/tweets';
import { initialStore } from '../../../constants/initial_tweets_store';

const $normalizedTweets: Store<NormalizedTweetInfo> = $socketMessage.map(
  (
    { finalTweets, meanSentiment, minCoefficient, maxCoefficient, tweetsType },
    lastState = initialStore,
  ) => {
    if (tweetsType !== LATEST_TWEETS) {
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
export const $isLoadingLatestTweets = createStore<boolean | null>(null);

$isLoadingLatestTweets.on(sendFx, () => true);
$isLoadingLatestTweets.on($socketMessage, (defaultState, { tweetsType }) => {
  if (tweetsType === LATEST_TWEETS) {
    return false;
  }

  return defaultState;
});

export const $latestTweets = combine({
  tweets: $normalizedTweets,
  isLoading: $isLoadingLatestTweets,
});
