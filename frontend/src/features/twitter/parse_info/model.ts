import { combine, createStore } from 'effector';

import { $socketMessage, onMessage, sendFx } from '../../../socket';

import { getNormalizedTweetAnalyze } from '../lib/get_normalized_tweets';

const $analyzedTweets = $socketMessage.map(getNormalizedTweetAnalyze);

const $isLoading = createStore<boolean>(false);

$isLoading.on(sendFx.done, () => true);
$isLoading.on(onMessage, () => false);

export const $tweetsWithCoefficients = combine({
  analyzedTweets: $analyzedTweets,
  isLoading: $isLoading,
});
