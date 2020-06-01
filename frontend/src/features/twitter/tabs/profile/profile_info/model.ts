import { createStore, combine } from 'effector';

import { $profileMessage, sendFx } from '../../../../../socket';
import { speakMessage } from '../../../../../lib/speech_synthesis';
import { SUCCESS_PROFILE_INFO_SPEECH } from '../../../../../constants/speech';

export const $isLoadingProfileInfo = createStore<boolean | null>(null);

$isLoadingProfileInfo.on(sendFx, () => true);
$isLoadingProfileInfo.on($profileMessage, () => {
  speakMessage(SUCCESS_PROFILE_INFO_SPEECH);
  return false;
});

export const $profileInfo = combine({
  profileInfo: $profileMessage,
  isLoading: $isLoadingProfileInfo,
});
