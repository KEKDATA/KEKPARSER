import { createStore, combine, createEvent, guard } from 'effector';

import { $tweetsMessage, sendFx } from '../../../../../socket';
import { TOP_TWEETS } from '../../../../../constants/tweets_types';
import { initialStore } from '../../../../../constants/initial_tweets_store';
import {
  FinalConvertedTweet,
  NormalizedTweetInfo,
  TakenTweetsInfo,
} from '../../../../../types/tweets';
import { speakMessage } from '../../../../../lib/speech_synthesis';
import { SUCCESS_TOP_TWEETS_SPEECH } from '../../../../../constants/speech';
import { setNormalizedTweets } from '../../../../../lib/set_normalized_tweets';
import { getConvertedTweets } from '../../../../../lib/convert_tweets';

export const $normalizedTopTweets = createStore<NormalizedTweetInfo>(
  initialStore,
);
export const $topTweetsForConvert = createStore<Array<FinalConvertedTweet>>([]);

const topChanged = createEvent<TakenTweetsInfo>();

$normalizedTopTweets.on(topChanged, setNormalizedTweets);
// @ts-ignore  ¯\_(ツ)_/¯
$topTweetsForConvert.on(topChanged, getConvertedTweets);

guard({
  source: $tweetsMessage,
  filter: message => message.tweetsType === TOP_TWEETS,
  target: topChanged,
});

export const $isLoadingTopTweets = createStore<boolean | null>(null);

$isLoadingTopTweets.on(sendFx, () => true);
$isLoadingTopTweets.on(topChanged, () => {
  speakMessage(SUCCESS_TOP_TWEETS_SPEECH);
  return false;
});

export const $topTweets = combine({
  tweets: $normalizedTopTweets,
  tweetsToConvert: $topTweetsForConvert,
  isLoading: $isLoadingTopTweets,
});
