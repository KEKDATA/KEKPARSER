import { TakenProfileInfo } from '../types/profile_info';

export const initialStore: TakenProfileInfo = {
  name: '',
  tweetName: '',
  description: '',
  contactInfo: [],
  activityInfo: [],
  sentimentCoefficient: null,
  classifierData: '',
  tweetsType: null,
};
