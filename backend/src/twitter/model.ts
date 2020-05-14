import { createEvent, createStore, Event } from 'effector';
import { Page } from 'playwright';
import { ProfileTabs } from './types';
import { LIKES, MEDIA, TWEETS_REPLIES_TAB, TWEETS_TAB } from './constants/tabs';

export const $profileTab = createStore<ProfileTabs | ''>('');
export const $webdriverPage = createStore<Page>(<Page>{});
export const $isProfileTarget = $profileTab.map((tab: ProfileTabs) => {
  const isProfileTarget = [
    TWEETS_TAB,
    TWEETS_REPLIES_TAB,
    MEDIA,
    LIKES,
  ].includes(tab);

  return isProfileTarget;
});

export const setProfileTab: Event<string> = createEvent();
export const setWebdriverPage: Event<Page> = createEvent();

$profileTab.on(setProfileTab, (_, tab: ProfileTabs) => tab);
$webdriverPage.on(setWebdriverPage, (_, page: Page) => page);
