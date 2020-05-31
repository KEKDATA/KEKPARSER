import { createStore, guard, createEvent, combine } from 'effector';

import { $tweetsMessage, sendFx } from '../../../../../socket';

import { TWEETS } from '../../../../../constants/tweets_types';
import { initialStore } from '../../../../../constants/initial_tweets_store';
import {
  NormalizedTweetInfo,
  TakenTweetsInfo,
} from '../../../../../types/tweets';
import { setNormalizedTweets } from '../../../../../lib/set_normalized_tweets';

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
$isLoadingProfileTweets.on(profileChanged, () => false);

export const $profileTweets = combine({
  tweets: $profileNormalizedTweets,
  isLoading: $isLoadingProfileTweets,
});
