import { NormalizedTweetInfo, TakenTweetsInfo } from '../../types/tweets';
import { getNormalizedTweetAnalyze } from '../../features/twitter/lib/get_normalized_tweets';

export const setNormalizedTweets = (
  prevState: NormalizedTweetInfo,
  {
    finalTweets,
    meanSentiment,
    minCoefficient,
    maxCoefficient,
  }: TakenTweetsInfo,
) => {
  const normalizedTweets = {
    finalTweets,
    ...getNormalizedTweetAnalyze({
      maxCoefficient,
      minCoefficient,
      meanSentiment,
    }),
  };

  return normalizedTweets;
};
