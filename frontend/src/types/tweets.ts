import { Latest, Likes, Top, Tweets, TweetsAndReplies } from './parse_type';

export type NormalizedTweetInfo = {
  finalTweets: Array<FinalTweet>;
  tweetWithMinCoefficient: FinalTweet;
  tweetWithMaxCoefficient: FinalTweet;
  isExistMin: boolean;
  isExistMax: boolean;
  isMeanSentimentExist: boolean;
  meanSentiment: number | null;
};

export type FinalTweet = {
  id: string;
  userUrl: string;
  name: string;
  tweetName: string;
  tweetContent: string;
  likes: number;
  retweets: number;
  replies: number;
  replyingUsers?: Array<{ user: string; userLink: string; id: string }>;
  tweetSentiment: number;
  tweetBayes: string;
};

export type TakenTweetsInfo = {
  finalTweets: Array<FinalTweet>;
  meanSentiment: number | null;
  minCoefficient: FinalTweet;
  maxCoefficient: FinalTweet;
  tweetsType: Top | Latest | Tweets | TweetsAndReplies | Likes | null;
};
