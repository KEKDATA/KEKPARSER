import Queue from 'bull';
import { nanoid } from 'nanoid';

import { OPTIONS, MAX_JOBS_PER_WORKER } from './config';
import { getProfileInfo } from '../twitter/profile/profile_info';
import { setupWebdriverFx } from '../webdriver';

console.info('Profile connected');

const profileQueue = new Queue('profile', OPTIONS);
const webQueue = new Queue('web', OPTIONS);

profileQueue.process(MAX_JOBS_PER_WORKER, async job => {
  const { id, options, tweetsType } = job.data;

  await setupWebdriverFx({ options });

  const { profileInfo } = await getProfileInfo(null);

  const { activityInfo, contactInfo, ...actualProfile } = profileInfo;
  const normalizedActivityInfo = activityInfo.map((info: string) => ({
    id: nanoid(),
    info,
  }));
  const normalizedContactInfo = contactInfo.map((info: string) => ({
    id: nanoid(),
    info,
  }));

  webQueue.add({
    id,
    result: {
      activityInfo: normalizedActivityInfo,
      contactInfo: normalizedContactInfo,
      ...actualProfile,
      tweetsType,
    },
  });
});
