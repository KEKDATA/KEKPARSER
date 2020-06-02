import { createEvent, createStore } from 'effector';
import { MouseEvent } from 'react';
import { Latest, Top } from '../../../../types/parse_type';

export const $tweetsParseType = createStore<Top | Latest | ''>('');

export const tweetsParseTypeChanged = createEvent<MouseEvent<HTMLElement>>();

$tweetsParseType.on(tweetsParseTypeChanged, (_, event) => {
  // @ts-ignore
  const type = event.currentTarget.value;
  return type;
});
