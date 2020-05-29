import Queue from 'bull';
import { nanoid } from 'nanoid';

import { OPTIONS, MAX_JOBS_PER_WORKER } from './config';
import { getProfileInfo } from '../twitter/profile/profile_info';
import { setupWebdriverFx } from '../webdriver';
import { NormalizedProfileInfo, ProfileParsedInfo, Send } from '../types';
import { ProfileInfo } from '../twitter/types';

console.info('Profile connected');

const profileQueue = new Queue('profile', OPTIONS);
const webQueue = new Queue('web', OPTIONS);

profileQueue.process(MAX_JOBS_PER_WORKER, async job => {
  const {
    id,
    options,
    tweetsType,
  }: { tweetsType: ProfileInfo; id: string; options: Send } = job.data;

  await setupWebdriverFx({ options });

  const {
    profileInfo,
  }: { profileInfo: ProfileParsedInfo } = await getProfileInfo(null);

  const { activityInfo, contactInfo, ...actualProfile } = profileInfo;
  const normalizedActivityInfo = activityInfo.map((info: string) => ({
    id: nanoid(),
    info,
  }));
  const normalizedContactInfo = contactInfo.map((info: string) => ({
    id: nanoid(),
    info,
  }));

  const normalizedProfileInfo: NormalizedProfileInfo = {
    activityInfo: normalizedActivityInfo,
    contactInfo: normalizedContactInfo,
    ...actualProfile,
    tweetsType,
  };

  webQueue.add({
    id,
    result: normalizedProfileInfo,
  });
});
