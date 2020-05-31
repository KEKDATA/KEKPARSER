import { createStore, guard, createEvent, combine } from 'effector';

import { $tweetsMessage, sendFx } from '../../../../../socket';

import { MEDIA } from '../../../../../constants/tweets_types';
import { initialStore } from '../../../../../constants/initial_tweets_store';
import {
  NormalizedTweetInfo,
  TakenTweetsInfo,
} from '../../../../../types/tweets';
import { setNormalizedTweets } from '../../../../../lib/set_normalized_tweets';

export const $normalizedMediaTweets = createStore<NormalizedTweetInfo>(
  initialStore,
);

const mediaChanged = createEvent<TakenTweetsInfo>();

$normalizedMediaTweets.on(mediaChanged, setNormalizedTweets);

guard({
  source: $tweetsMessage,
  filter: message => message.tweetsType === MEDIA,
  target: mediaChanged,
});

export const $isLoadingLikesTweets = createStore<boolean | null>(null);

$isLoadingLikesTweets.on(sendFx, () => true);
$isLoadingLikesTweets.on(mediaChanged, () => false);

export const $mediaTweets = combine({
  tweets: $normalizedMediaTweets,
  isLoading: $isLoadingLikesTweets,
});
