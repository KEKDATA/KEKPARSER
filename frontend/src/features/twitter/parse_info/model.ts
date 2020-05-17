import { combine, createStore } from 'effector';

import { $socketMessage, FinalTweet, onMessage, sendFx } from '../../../socket';

const checkIsExistCoefficients = (coefficient: FinalTweet) =>
  coefficient && Object.values(coefficient).length > 0;

const $tweetWithMinCoefficient = $socketMessage.map(({ minCoefficient }) => {
  const isExistMin = checkIsExistCoefficients(minCoefficient);

  return { tweetWithMinCoefficient: minCoefficient, isExistMin };
});
const $tweetWithMaxCoefficient = $socketMessage.map(({ maxCoefficient }) => {
  const isExistMax = checkIsExistCoefficients(maxCoefficient);

  return { tweetWithMaxCoefficient: maxCoefficient, isExistMax };
});
const $isLoading = createStore<boolean>(false);

$isLoading.on(sendFx.done, () => true);
$isLoading.on(onMessage, () => false);

export const $tweetsWithCoefficients = combine({
  minCoefficient: $tweetWithMinCoefficient,
  maxCoefficient: $tweetWithMaxCoefficient,
  isLoading: $isLoading,
});
