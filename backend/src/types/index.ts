export type ProfileSettings = {
  isLikes: boolean;
  isTweets: boolean;
  isTweetsAndReplies: boolean;
  isMedia: boolean;
};

export type TweetsSettings = {
  isTop: boolean;
  isLatest: boolean;
};

export type Send = {
  parseTarget: string;
  tweetsCount: number;
  parseUrl: string;
  profileSettings?: ProfileSettings;
  tweetsSettings?: TweetsSettings;
};

export type Profile = {
  sentimentCoefficient: number | null;
  contactInfo: Array<string>;
  classifierData: string | null;
  name: string;
  tweetName: string;
  description: string;
  activityInfo: Array<string>;
};
