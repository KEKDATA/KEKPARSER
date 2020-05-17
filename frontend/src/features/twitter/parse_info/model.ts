import { combine, createStore } from 'effector';

import { $socketMessage, FinalTweet, onMessage, sendFx } from '../../../socket';
import { checkIsNumberExist } from '../../../lib/is_number_exist';

const checkIsExistCoefficients = (coefficient: FinalTweet) =>
  coefficient && Object.values(coefficient).length > 0;

const $analyzedTweets = $socketMessage.map(
  ({ maxCoefficient, minCoefficient, meanSentiment }) => {
    const isExistMin = checkIsExistCoefficients(minCoefficient);
    const isExistMax = checkIsExistCoefficients(maxCoefficient);
    const isMeanSentimentExist = checkIsNumberExist(meanSentiment);

    const actualMeanSentiment = isMeanSentimentExist && meanSentiment;

    return {
      tweetWithMinCoefficient: minCoefficient,
      tweetWithMaxCoefficient: maxCoefficient,
      isExistMin,
      isExistMax,
      meanSentiment: actualMeanSentiment,
    };
  },
);

const $isLoading = createStore<boolean>(false);

$isLoading.on(sendFx.done, () => true);
$isLoading.on(onMessage, () => false);

export const $tweetsWithCoefficients = combine({
  analyzedTweets: $analyzedTweets,
  isLoading: $isLoading,
});
