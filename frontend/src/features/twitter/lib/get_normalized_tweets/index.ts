import { checkIsNumberExist } from '../../../../lib/is_number_exist';
import { FinalTweet } from '../../../../types/tweets';

const checkIsExistCoefficients = (coefficient: object) =>
  coefficient && Object.values(coefficient).length > 0;

export const getNormalizedTweetAnalyze = ({
  maxCoefficient,
  minCoefficient,
  meanSentiment,
}: {
  maxCoefficient: FinalTweet;
  minCoefficient: FinalTweet;
  meanSentiment: number | null;
}) => {
  const isExistMin = checkIsExistCoefficients(minCoefficient);
  const isExistMax = checkIsExistCoefficients(maxCoefficient);
  const isMeanSentimentExist = checkIsNumberExist(meanSentiment);

  const actualMeanSentiment = isMeanSentimentExist ? meanSentiment : null;

  return {
    tweetWithMinCoefficient: minCoefficient,
    tweetWithMaxCoefficient: maxCoefficient,
    isExistMin,
    isExistMax,
    isMeanSentimentExist,
    meanSentiment: actualMeanSentiment,
  };
};
