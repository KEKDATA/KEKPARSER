import { createStore, combine, guard, createEvent } from 'effector';

import { $tweetsMessage, sendFx } from '../../../../../socket';

import { LATEST_TWEETS } from '../../../../../constants/tweets_types';

import {
  FinalConvertedTweet,
  NormalizedTweetInfo,
  TakenTweetsInfo,
} from '../../../../../types/tweets';
import { initialStore } from '../../../../../constants/initial_tweets_store';
import { speakMessage } from '../../../../../lib/speech_synthesis';
import { SUCCESS_LATEST_TWEETS_SPEECH } from '../../../../../constants/speech';
import { setNormalizedTweets } from '../../../../../lib/set_normalized_tweets';
import { getConvertedTweets } from '../../../../../lib/convert_tweets';

export const $normalizedLatestTweets = createStore<NormalizedTweetInfo>(
  initialStore,
);
export const $latestTweetsForConvert = createStore<Array<FinalConvertedTweet>>(
  [],
);

const latestChanged = createEvent<TakenTweetsInfo>();

$normalizedLatestTweets.on(latestChanged, setNormalizedTweets);
// @ts-ignore  ¯\_(ツ)_/¯
$latestTweetsForConvert.on(latestChanged, getConvertedTweets);

guard({
  source: $tweetsMessage,
  filter: message => message.tweetsType === LATEST_TWEETS,
  target: latestChanged,
});

export const $isLoadingLatestTweets = createStore<boolean | null>(null);

$isLoadingLatestTweets.on(sendFx, () => true);
$isLoadingLatestTweets.on(latestChanged, () => {
  speakMessage(SUCCESS_LATEST_TWEETS_SPEECH);
  return false;
});

export const $latestTweets = combine({
  tweets: $normalizedLatestTweets,
  tweetsToConvert: $latestTweetsForConvert,
  isLoading: $isLoadingLatestTweets,
});
