import { createEvent, createStore } from 'effector';
import { MouseEvent } from 'react';

export const $tweetsParseType = createStore<'top' | 'latest' | ''>('');

export const tweetsParseTypeChanged = createEvent<MouseEvent<HTMLElement>>();

$tweetsParseType.on(tweetsParseTypeChanged, (_, event) => {
  // @ts-ignore
  const type = event.currentTarget.value;
  return type;
});
