import { ProfileInfo } from '../twitter/types';

export type ProfileSettings = {
  isLikes: boolean;
  isTweets: boolean;
  isTweetsAndReplies: boolean;
  isMedia: boolean;
  isProfileInfo: boolean;
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

export type NormalizedDescription = Array<{
  text: string;
  isUrl: boolean;
  url: string | undefined;
  id: string;
}>;

export type ProfileParsedInfo = {
  avatarUrl: string;
  sentimentCoefficient: number | null;
  contactInfo: Array<string>;
  classifierData: string | null;
  name: string;
  tweetName: string;
  description: NormalizedDescription;
  activityInfo: Array<string>;
  tweetsType: null;
};

export type NormalizedProfileInfo = {
  avatarUrl: string;
  sentimentCoefficient: number | null;
  contactInfo: Array<{ info: string; id: string }>;
  classifierData: string | null;
  name: string;
  tweetName: string;
  description: NormalizedDescription;
  activityInfo: Array<{ info: string; id: string }>;
  tweetsType: ProfileInfo;
};
