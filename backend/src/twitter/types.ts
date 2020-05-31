export type Tweet = {
  userUrl: string;
  name: string;
  tweetName: string;
  tweetContent: string;
  likes: number;
  retweets: number;
  replies: number;
  replyingUsers?: Array<{ user: string; userLink: string; id: string }>;
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

export type ParsedTweets = Array<Tweet>;

export type ProfileOption = 'profile';
export type SearchTweetsOption = 'search_tweets';

export type Latest = 'latest';
export type Top = 'top';
export type Tweets = 'tweets';
export type TweetsAndReplies = 'tweetsAndReplies';
export type Media = 'media';
export type Likes = 'likes';
export type ProfileInfo = 'profile_info';
export type ProfileTabs =
  | Tweets
  | Likes
  | TweetsAndReplies
  | Media
  | ProfileInfo;
export type TweetsTabs =
  | Latest
  | Top
  | Tweets
  | TweetsAndReplies
  | Media
  | Likes;
