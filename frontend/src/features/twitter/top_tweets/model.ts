import { Store, createStore, combine } from 'effector';

import { $socketMessage, sendFx } from '../../../socket';
import { TOP_TWEETS } from '../../../constants/tweets_types';
import { getNormalizedTweetAnalyze } from '../lib/get_normalized_tweets';
import { initialStore } from '../../../constants/initial_tweets_store';
import { NormalizedTweetInfo } from '../../../types/tweets';

const $normalizedTweets: Store<NormalizedTweetInfo> = $socketMessage.map(
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
const $isLoadingTopTweets = createStore<boolean | null>(null);

$isLoadingTopTweets.on(sendFx, () => true);
$isLoadingTopTweets.on(
  $socketMessage,
  (_, { tweetsType }) => tweetsType !== TOP_TWEETS,
);

export const $topTweets = combine({
  tweets: $normalizedTweets,
  isLoading: $isLoadingTopTweets,
});
