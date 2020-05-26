import { createStore, guard, createEvent, combine } from 'effector';

import { $socketMessage, sendFx, TakenTweetsInfo } from '../../../../../socket';

import { TWEETS } from '../../../../../constants/tweets_types';
import { initialStore } from '../../../../../constants/initial_tweets_store';
import { NormalizedTweetInfo } from '../../../../../types/tweets';
import { getNormalizedTweetAnalyze } from '../../../lib/get_normalized_tweets';

export const $profileNormalizedTweets = createStore<NormalizedTweetInfo>(
  initialStore,
);

const profileChanged = createEvent<TakenTweetsInfo>();

$profileNormalizedTweets.on(
  profileChanged,
  (
    prevState,
    { finalTweets, meanSentiment, minCoefficient, maxCoefficient },
  ) => {
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

guard({
  source: $socketMessage,
  filter: message => message.tweetsType === TWEETS,
  target: profileChanged,
});

export const $isLoadingTweets = createStore<boolean | null>(null);

$isLoadingTweets.on(sendFx, () => true);
$isLoadingTweets.on(profileChanged, () => false);

export const $profileTweets = combine({
  tweets: $profileNormalizedTweets,
  isLoading: $isLoadingTweets,
});
