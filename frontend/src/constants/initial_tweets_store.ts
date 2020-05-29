import { FinalTweet, NormalizedTweetInfo } from '../types/tweets';

export const initialStore: NormalizedTweetInfo = {
  finalTweets: [],
  tweetWithMinCoefficient: <FinalTweet>{},
  tweetWithMaxCoefficient: <FinalTweet>{},
  isExistMin: false,
  isExistMax: false,
  isMeanSentimentExist: false,
  meanSentiment: null,
};
