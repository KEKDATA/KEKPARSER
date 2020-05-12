import { createEvent, createStore, combine } from 'effector';

import { OnChangeEvent } from '../../../lib/events/types/change';
import { getEventChecked } from '../../../lib/events/get_checked_event';

const $isLikes = createStore<boolean>(false);
const $isTweets = createStore<boolean>(true);
const $isTweetsAndReplies = createStore<boolean>(false);
const $isMedia = createStore<boolean>(false);

export const likesStatusChanged = createEvent<OnChangeEvent>();
export const tweetsStatusChanged = createEvent<OnChangeEvent>();
export const tweetsAndRepliesChanged = createEvent<OnChangeEvent>();
export const mediaStatusChanged = createEvent<OnChangeEvent>();

$isLikes.on(likesStatusChanged.map(getEventChecked), (_, status) => status);
$isTweets.on(tweetsStatusChanged.map(getEventChecked), (_, status) => status);
$isTweetsAndReplies.on(
  tweetsAndRepliesChanged.map(getEventChecked),
  (_, status) => status,
);
$isMedia.on(mediaStatusChanged.map(getEventChecked), (_, status) => status);

export const $profileStore = combine({
  isLikes: $isLikes,
  isTweets: $isTweets,
  isTweetsAndReplies: $isTweetsAndReplies,
  isMedia: $isMedia,
});
