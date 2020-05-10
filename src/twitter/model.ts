import { createEvent, createStore, Event } from 'effector';
import { Page } from 'playwright';
import { ProfileTabs } from './types';

export const $profileTab = createStore<ProfileTabs>('Tweets');
export const $webdriverPage = createStore<Page>(<Page>{});

export const setProfileTab: Event<string> = createEvent();
export const setWebdriverPage: Event<Page> = createEvent();

$profileTab.on(setProfileTab, (_, tab: ProfileTabs) => tab);
$webdriverPage.on(setWebdriverPage, (_, page: Page) => page);
