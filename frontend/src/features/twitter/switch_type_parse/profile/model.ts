import { createEvent, createStore } from 'effector';
import { MouseEvent } from 'react';

import { ProfileTabs } from '../../../../types/parse_type';

export const $profileParseType = createStore<ProfileTabs | ''>('');

export const profileParseTypeChanged = createEvent<MouseEvent<HTMLElement>>();

$profileParseType.on(profileParseTypeChanged, (_, event) => {
  // @ts-ignore
  const type = event.currentTarget.value;
  return type;
});
