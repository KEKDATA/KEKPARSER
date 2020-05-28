export type TakenProfileInfo = {
  sentimentCoefficient: number | null;
  contactInfo: Array<{ info: string; id: string }>;
  classifierData: string | null;
  name: string;
  tweetName: string;
  description: string;
  activityInfo: Array<{ info: string; id: string }>;
  tweetsType: null;
};
