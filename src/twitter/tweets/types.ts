export type Tweet = {
  userUrl: string;
  userName: string;
  tweetContent: string;
  likes: number;
  retweets: number;
  replies: number;
};

export type FinalTweet = {
  userUrl: string;
  userName: string;
  tweetContent: string;
  likes: number;
  retweets: number;
  replies: number;
  tweetSentiment: number;
  tweetBayes: string;
};
