import { FinalTweet } from '../socket';

export type NormalizedTweetInfo = {
  finalTweets: Array<FinalTweet>;
  tweetWithMinCoefficient: FinalTweet;
  tweetWithMaxCoefficient: FinalTweet;
  isExistMin: boolean;
  isExistMax: boolean;
  isMeanSentimentExist: boolean;
  meanSentiment: number | null;
};
