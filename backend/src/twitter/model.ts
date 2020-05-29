import { createEvent, createStore, Event } from 'effector';
import { Page, Browser } from 'playwright';

import { ProfileTabs } from './types';

import {
  LIKES,
  MEDIA,
  TWEETS_REPLIES_TAB,
  TWEETS_TAB,
  PROFILE_INFO_TYPE,
} from './constants/tabs';
import { setupWebdriverFx } from '../webdriver';

export const $profileTab = createStore<ProfileTabs | ''>('');
export const $webdriverPage = createStore<Page>(<Page>{});
export const $webdriverBrowser = createStore<Browser>(<Browser>{});
export const $parseTarget = createStore<string>('');
export const $tweetsCount = createStore<number>(0);
export const $isProfileTarget = $profileTab.map((tab: ProfileTabs) => {
  const isProfileTarget = [
    TWEETS_TAB,
    TWEETS_REPLIES_TAB,
    MEDIA,
    LIKES,
    PROFILE_INFO_TYPE,
  ].includes(tab);

  return isProfileTarget;
});

export const setProfileTab: Event<string> = createEvent();

$profileTab.on(setProfileTab, (_, tab: ProfileTabs) => tab);
$webdriverPage.on(setupWebdriverFx.doneData, (_, { page }) => page);
$webdriverBrowser.on(setupWebdriverFx.doneData, (_, { browser }) => browser);
$parseTarget.on(setupWebdriverFx.doneData, (_, { parseTarget }) => parseTarget);
$tweetsCount.on(setupWebdriverFx.doneData, (_, { tweetsCount }) => tweetsCount);
