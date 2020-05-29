import { createStore, guard, createEvent, combine } from 'effector';

import { $tweetsMessage, sendFx } from '../../../../../socket';

import { TWEETS_REPLIES } from '../../../../../constants/tweets_types';
import { initialStore } from '../../../../../constants/initial_tweets_store';
import {
  NormalizedTweetInfo,
  TakenTweetsInfo,
} from '../../../../../types/tweets';
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
  source: $tweetsMessage,
  filter: message => message.tweetsType === TWEETS_REPLIES,
  target: profileTweetsAndRepliesChanged,
});

export const $isLoadingTweetsAndReplies = createStore<boolean | null>(null);

$isLoadingTweetsAndReplies.on(sendFx, () => true);
$isLoadingTweetsAndReplies.on(profileTweetsAndRepliesChanged, () => false);

export const $profileTweetsAndReplies = combine({
  tweets: $profileNormalizedTweetsAndReplies,
  isLoading: $isLoadingTweetsAndReplies,
});
