export type TakenProfileInfo = {
  avatarUrl: string;
  sentimentCoefficient: number | null;
  contactInfo: Array<{ info: string; id: string }>;
  classifierData: string | null;
  name: string;
  tweetName: string;
  description: Array<{
    text: string;
    isUrl: boolean;
    url: string | undefined;
    id: string;
  }>;
  activityInfo: Array<{ info: string; id: string }>;
  tweetsType: null;
};
