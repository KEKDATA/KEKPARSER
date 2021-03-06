import { createEvent, createStore, combine } from 'effector';

import { OnChangeEvent } from '../../../../lib/events/types/change';
import { getEventChecked } from '../../../../lib/events/get_checked_event';

const $isTop = createStore<boolean>(true);
const $isLatest = createStore<boolean>(false);

export const topStatusChanged = createEvent<OnChangeEvent>();
export const latestStatusChanged = createEvent<OnChangeEvent>();

$isTop.on(
  topStatusChanged.map(getEventChecked),
  (_, status: boolean) => status,
);
$isLatest.on(
  latestStatusChanged.map(getEventChecked),
  (_, status: boolean) => status,
);

export const $searchTweetsSettings = combine({
  isTop: $isTop,
  isLatest: $isLatest,
});
