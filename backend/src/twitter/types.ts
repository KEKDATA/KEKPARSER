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

export type Tweets = 'Tweets';
export type TweetsAndReplies = 'TweetsAndReplies';
export type Media = 'Media';
export type Likes = 'Likes';
export type ProfileTabs = Tweets | Likes | TweetsAndReplies | Media;
