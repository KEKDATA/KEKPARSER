import { createStore, guard, createEvent, combine } from 'effector';

import { $tweetsMessage, sendFx } from '../../../../../socket';

import { TWEETS_REPLIES } from '../../../../../constants/tweets_types';
import { initialStore } from '../../../../../constants/initial_tweets_store';
import {
  FinalConvertedTweet,
  NormalizedTweetInfo,
  TakenTweetsInfo,
} from '../../../../../types/tweets';
import { setNormalizedTweets } from '../../../../../lib/set_normalized_tweets';
import { speakMessage } from '../../../../../lib/speech_synthesis';
import { SUCCESS_TWEETS_AND_REPLIES_SPEECH } from '../../../../../constants/speech';
import { getConvertedTweets } from '../../../../../lib/convert_tweets';

export const $profileNormalizedTweetsAndReplies = createStore<
  NormalizedTweetInfo
>(initialStore);
export const $repliesTweetsForConvert = createStore<Array<FinalConvertedTweet>>(
  [],
);

const profileTweetsAndRepliesChanged = createEvent<TakenTweetsInfo>();

$profileNormalizedTweetsAndReplies.on(
  profileTweetsAndRepliesChanged,
  setNormalizedTweets,
);
// @ts-ignore  ¯\_(ツ)_/¯
$repliesTweetsForConvert.on(profileTweetsAndRepliesChanged, getConvertedTweets);

guard({
  source: $tweetsMessage,
  filter: message => message.tweetsType === TWEETS_REPLIES,
  target: profileTweetsAndRepliesChanged,
});

export const $isLoadingTweetsAndReplies = createStore<boolean | null>(null);

$isLoadingTweetsAndReplies.on(sendFx, () => true);
$isLoadingTweetsAndReplies.on(profileTweetsAndRepliesChanged, () => {
  speakMessage(SUCCESS_TWEETS_AND_REPLIES_SPEECH);
  return false;
});

export const $profileTweetsAndReplies = combine({
  tweets: $profileNormalizedTweetsAndReplies,
  tweetsToConvert: $repliesTweetsForConvert,
  isLoading: $isLoadingTweetsAndReplies,
});
