import { createStore, guard, createEvent, combine } from 'effector';

import { $socketMessage, sendFx, TakenTweetsInfo } from '../../../../../socket';

import { TWEETS_REPLIES } from '../../../../../constants/tweets_types';
import { initialStore } from '../../../../../constants/initial_tweets_store';
import { NormalizedTweetInfo } from '../../../../../types/tweets';
import { getNormalizedTweetAnalyze } from '../../../lib/get_normalized_tweets';

export const $profileNormalizedTweetsAndReplies = createStore<
  NormalizedTweetInfo
>(initialStore);

const profileTweetsAndRepliesChanged = createEvent<TakenTweetsInfo>();

$profileNormalizedTweetsAndReplies.on(
  profileTweetsAndRepliesChanged,
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
  filter: message => message.tweetsType === TWEETS_REPLIES,
  target: profileTweetsAndRepliesChanged,
});

export const $isLoadingTweets = createStore<boolean | null>(null);

$isLoadingTweets.on(sendFx, () => true);
$isLoadingTweets.on(profileTweetsAndRepliesChanged, () => false);

export const $profileTweetsAndReplies = combine({
  tweets: $profileNormalizedTweetsAndReplies,
  isLoading: $isLoadingTweets,
});
