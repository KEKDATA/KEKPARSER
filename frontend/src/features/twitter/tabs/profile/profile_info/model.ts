import { createStore, combine } from 'effector';

import { $profileMessage, sendFx } from '../../../../../socket';

export const $isLoadingProfileInfo = createStore<boolean | null>(null);

$isLoadingProfileInfo.on(sendFx, () => true);
$isLoadingProfileInfo.on($profileMessage, () => false);

export const $profileInfo = combine({
  profileInfo: $profileMessage,
  isLoading: $isLoadingProfileInfo,
});
