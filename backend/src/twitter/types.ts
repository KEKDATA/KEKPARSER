export type Tweet = {
  userUrl: string;
  name: string;
  tweetName: string;
  tweetContent: string;
  likes: number;
  retweets: number;
  replies: number;
  replyingUsers?: Array<{ user: string; userLink: string }>;
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
  replyingUsers?: Array<{ user: string; userLink: string }>;
  tweetSentiment: number;
  tweetBayes: string;
};

export type ParsedTweets = Array<Tweet>;

export type Tweets = 'tweets';
export type TweetsAndReplies = 'tweetsAndReplies';
export type Media = 'media';
export type Likes = 'likes';
export type ProfileTabs = Tweets | Likes | TweetsAndReplies | Media;
