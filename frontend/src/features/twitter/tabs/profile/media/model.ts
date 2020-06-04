import { createStore, guard, createEvent, combine } from 'effector';

import { $tweetsMessage, sendFx } from '../../../../../socket';

import { MEDIA } from '../../../../../constants/tweets_types';
import { initialStore } from '../../../../../constants/initial_tweets_store';
import {
  FinalConvertedTweet,
  NormalizedTweetInfo,
  TakenTweetsInfo,
} from '../../../../../types/tweets';
import { setNormalizedTweets } from '../../../../../lib/set_normalized_tweets';
import { speakMessage } from '../../../../../lib/speech_synthesis';
import { SUCCESS_MEDIA_SPEECH } from '../../../../../constants/speech';
import { getConvertedTweets } from '../../../../../lib/convert_tweets';

export const $normalizedMediaTweets = createStore<NormalizedTweetInfo>(
  initialStore,
);
export const $mediaTweetsForConvert = createStore<Array<FinalConvertedTweet>>(
  [],
);

const mediaChanged = createEvent<TakenTweetsInfo>();

$normalizedMediaTweets.on(mediaChanged, setNormalizedTweets);
// @ts-ignore  ¯\_(ツ)_/¯
$mediaTweetsForConvert.on(mediaChanged, getConvertedTweets);

guard({
  source: $tweetsMessage,
  filter: message => message.tweetsType === MEDIA,
  target: mediaChanged,
});

export const $isLoadingMediaTweets = createStore<boolean | null>(null);

$isLoadingMediaTweets.on(sendFx, () => true);
$isLoadingMediaTweets.on(mediaChanged, () => {
  speakMessage(SUCCESS_MEDIA_SPEECH);
  return false;
});

export const $mediaTweets = combine({
  tweets: $normalizedMediaTweets,
  tweetsToConvert: $mediaTweetsForConvert,
  isLoading: $isLoadingMediaTweets,
});
