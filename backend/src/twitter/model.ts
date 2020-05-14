import { createEvent, createStore, Event } from 'effector';
import { Page } from 'playwright';
import { ProfileTabs } from './types';
import { LIKES, MEDIA, TWEETS_REPLIES_TAB, TWEETS_TAB } from './constants/tabs';
import { ProfileSettings, TweetsSettings } from '../socket';
import { setupWebdriverFx } from '../webdriver';

type Settings = ProfileSettings | TweetsSettings | {};

export const $profileTab = createStore<ProfileTabs | ''>('');
export const $webdriverPage = createStore<Page>(<Page>{});
export const $parseTarget = createStore<string>('');
export const $tweetsCount = createStore<number>(0);
export const $parseUrl = createStore<string>('');
export const $settings = createStore<Settings>({});
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
$parseTarget.on(setupWebdriverFx.doneData, (_, { parseTarget }) => parseTarget);
$tweetsCount.on(setupWebdriverFx.doneData, (_, { tweetsCount }) => tweetsCount);
$parseUrl.on(setupWebdriverFx.doneData, (_, { parseUrl }) => parseUrl);
$settings.on(setupWebdriverFx.doneData, (_, { settings }) => settings);
