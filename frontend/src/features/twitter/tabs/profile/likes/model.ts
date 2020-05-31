import { createStore, guard, createEvent, combine } from 'effector';

import { $tweetsMessage, sendFx } from '../../../../../socket';

import { LIKES } from '../../../../../constants/tweets_types';
import { initialStore } from '../../../../../constants/initial_tweets_store';
import {
  NormalizedTweetInfo,
  TakenTweetsInfo,
} from '../../../../../types/tweets';
import { setNormalizedTweets } from '../../../../../lib/set_normalized_tweets';

export const $normalizedLikesTweets = createStore<NormalizedTweetInfo>(
  initialStore,
);

const likesChanged = createEvent<TakenTweetsInfo>();

$normalizedLikesTweets.on(likesChanged, setNormalizedTweets);

guard({
  source: $tweetsMessage,
  filter: message => message.tweetsType === LIKES,
  target: likesChanged,
});

export const $isLoadingLikesTweets = createStore<boolean | null>(null);

$isLoadingLikesTweets.on(sendFx, () => true);
$isLoadingLikesTweets.on(likesChanged, () => false);

export const $likesTweets = combine({
  tweets: $normalizedLikesTweets,
  isLoading: $isLoadingLikesTweets,
});
