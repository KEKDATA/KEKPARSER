import { createStore, guard, createEvent, combine } from 'effector';

import { $tweetsMessage, sendFx } from '../../../../../socket';

import { LIKES } from '../../../../../constants/tweets_types';
import { initialStore } from '../../../../../constants/initial_tweets_store';
import {
  FinalConvertedTweet,
  NormalizedTweetInfo,
  TakenTweetsInfo,
} from '../../../../../types/tweets';
import { setNormalizedTweets } from '../../../../../lib/set_normalized_tweets';
import { speakMessage } from '../../../../../lib/speech_synthesis';
import { SUCCESS_LIKES_SPEECH } from '../../../../../constants/speech';
import { getConvertedTweets } from '../../../../../lib/convert_tweets';

export const $normalizedLikesTweets = createStore<NormalizedTweetInfo>(
  initialStore,
);
export const $likesTweetsForConvert = createStore<Array<FinalConvertedTweet>>(
  [],
);

const likesChanged = createEvent<TakenTweetsInfo>();

$normalizedLikesTweets.on(likesChanged, setNormalizedTweets);
// @ts-ignore  ¯\_(ツ)_/¯
$likesTweetsForConvert.on(likesChanged, getConvertedTweets);

guard({
  source: $tweetsMessage,
  filter: message => message.tweetsType === LIKES,
  target: likesChanged,
});

export const $isLoadingLikesTweets = createStore<boolean | null>(null);

$isLoadingLikesTweets.on(sendFx, () => true);
$isLoadingLikesTweets.on(likesChanged, () => {
  speakMessage(SUCCESS_LIKES_SPEECH);
  return false;
});

export const $likesTweets = combine({
  tweets: $normalizedLikesTweets,
  tweetsToConvert: $likesTweetsForConvert,
  isLoading: $isLoadingLikesTweets,
});
