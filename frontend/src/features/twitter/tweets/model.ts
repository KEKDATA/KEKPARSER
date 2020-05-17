import { createStore, combine } from 'effector';

import { $socketMessage, onMessage, sendFx } from '../../../socket';

const $isLoading = createStore<boolean>(false);
const $finalTweets = $socketMessage.map(({ finalTweets }) => finalTweets);

$isLoading.on(sendFx.done, () => true);
$isLoading.on(onMessage, () => false);

export const $tweets = combine({
  isLoading: $isLoading,
  finalTweets: $finalTweets,
});
