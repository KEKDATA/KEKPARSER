import { createStore, guard, createEvent, combine } from 'effector';

import { $tweetsMessage, sendFx } from '../../../../../socket';

import { TWEETS } from '../../../../../constants/tweets_types';
import { initialStore } from '../../../../../constants/initial_tweets_store';
import {
  NormalizedTweetInfo,
  TakenTweetsInfo,
} from '../../../../../types/tweets';
import { setNormalizedTweets } from '../../../../../lib/set_normalized_tweets';
import { speakMessage } from '../../../../../lib/speech_synthesis';
import { SUCCESS_PROFILE_TWEETS_SPEECH } from '../../../../../constants/speech';

export const $profileNormalizedTweets = createStore<NormalizedTweetInfo>(
  initialStore,
);

const profileChanged = createEvent<TakenTweetsInfo>();

$profileNormalizedTweets.on(profileChanged, setNormalizedTweets);

guard({
  source: $tweetsMessage,
  filter: message => message.tweetsType === TWEETS,
  target: profileChanged,
});

export const $isLoadingProfileTweets = createStore<boolean | null>(null);

$isLoadingProfileTweets.on(sendFx, () => true);
$isLoadingProfileTweets.on(profileChanged, () => {
  speakMessage(SUCCESS_PROFILE_TWEETS_SPEECH);
  return false;
});

export const $profileTweets = combine({
  tweets: $profileNormalizedTweets,
  isLoading: $isLoadingProfileTweets,
});
