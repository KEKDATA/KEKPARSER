import { createStore, guard, createEvent, combine } from 'effector';

import { $tweetsMessage, sendFx } from '../../../../../socket';

import { MEDIA } from '../../../../../constants/tweets_types';
import { initialStore } from '../../../../../constants/initial_tweets_store';
import {
  NormalizedTweetInfo,
  TakenTweetsInfo,
} from '../../../../../types/tweets';
import { setNormalizedTweets } from '../../../../../lib/set_normalized_tweets';
import { speakMessage } from '../../../../../lib/speech_synthesis';
import { SUCCESS_MEDIA_SPEECH } from '../../../../../constants/speech';

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

export const $isLoadingMediaTweets = createStore<boolean | null>(null);

$isLoadingMediaTweets.on(sendFx, () => true);
$isLoadingMediaTweets.on(mediaChanged, () => {
  speakMessage(SUCCESS_MEDIA_SPEECH);
  return false;
});

export const $mediaTweets = combine({
  tweets: $normalizedMediaTweets,
  isLoading: $isLoadingMediaTweets,
});
