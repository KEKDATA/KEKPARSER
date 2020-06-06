import { createStore, combine } from 'effector';

import { $profileMessage, sendFx } from '../../../../../socket';
import { speakMessage } from '../../../../../lib/speech_synthesis';
import { SUCCESS_PROFILE_INFO_SPEECH } from '../../../../../constants/speech';

export const $isLoadingProfileInfo = createStore<boolean | null>(null);
export const $profileInfoForConvert = createStore<Array<any>>([]);

$isLoadingProfileInfo.on(sendFx, () => true);
$isLoadingProfileInfo.on($profileMessage, () => {
  speakMessage(SUCCESS_PROFILE_INFO_SPEECH);
  return false;
});

$profileInfoForConvert.on(
  $profileMessage,
  (
    _,
    {
      activityInfo,
      classifierData,
      contactInfo,
      description,
      name,
      sentimentCoefficient,
      tweetName,
      avatarUrl,
    },
  ) => {
    const normalizedProfileInfoForConvert = [
      {
        activityInfo: activityInfo.map(({ info }) => info).join(', '),
        classifierData,
        contactInfo: contactInfo.map(({ info }) => info).join(', '),
        description: description.map(({ text }) => text).join(' '),
        name,
        sentimentCoefficient,
        tweetName,
        avatarUrl,
      },
    ];

    return normalizedProfileInfoForConvert;
  },
);

export const $profileInfo = combine({
  profileInfo: $profileMessage,
  profileInfoForConvert: $profileInfoForConvert,
  isLoading: $isLoadingProfileInfo,
});
