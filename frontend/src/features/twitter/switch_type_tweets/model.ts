import { createEvent, createStore, combine } from 'effector';
import { MouseEvent } from 'react';

export const $isLatest = createStore<boolean>(false);
export const $isTop = createStore<boolean>(false);

export const latestStatusToggled = createEvent<MouseEvent<HTMLElement>>();
export const topStatusToggled = createEvent<MouseEvent<HTMLElement>>();

$isLatest.on(latestStatusToggled, () => true);
$isLatest.on(topStatusToggled, () => false);

$isTop.on(topStatusToggled, () => true);
$isTop.on(latestStatusToggled, () => false);

export const $switchTypes = combine({ isLatest: $isLatest, isTop: $isTop });
