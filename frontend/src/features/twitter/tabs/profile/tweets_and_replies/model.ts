import { createStore, guard, createEvent, combine } from 'effector';

import { $tweetsMessage, sendFx } from '../../../../../socket';

import { TWEETS_REPLIES } from '../../../../../constants/tweets_types';
import { initialStore } from '../../../../../constants/initial_tweets_store';
import {
  NormalizedTweetInfo,
  TakenTweetsInfo,
} from '../../../../../types/tweets';
import { setNormalizedTweets } from '../../../../../lib/set_normalized_tweets';
import { speakMessage } from '../../../../../lib/speech_synthesis';
import { SUCCESS_TWEETS_AND_REPLIES_SPEECH } from '../../../../../constants/speech';

export const $profileNormalizedTweetsAndReplies = createStore<
  NormalizedTweetInfo
>(initialStore);

const profileTweetsAndRepliesChanged = createEvent<TakenTweetsInfo>();

$profileNormalizedTweetsAndReplies.on(
  profileTweetsAndRepliesChanged,
  setNormalizedTweets,
);

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
  isLoading: $isLoadingTweetsAndReplies,
});
