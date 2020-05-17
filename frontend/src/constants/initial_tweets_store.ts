import { NormalizedTweetInfo } from '../types/tweets';
import { FinalTweet } from '../socket';

export const initialStore: NormalizedTweetInfo = {
  finalTweets: [],
  tweetWithMinCoefficient: <FinalTweet>{},
  tweetWithMaxCoefficient: <FinalTweet>{},
  isExistMin: false,
  isExistMax: false,
  meanSentiment: null,
  isLoaded: false,
};
