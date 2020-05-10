import { createEvent, createStore, Event } from 'effector';

export const $profileTab = createStore<string>('');

export const setProfileTab: Event<string> = createEvent();

$profileTab.on(setProfileTab, (_, tab) => tab);
