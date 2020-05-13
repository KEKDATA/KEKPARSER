import { combine, createEvent, createStore } from 'effector';

import { SEARCH_TWEETS } from '../../../constants/parse_target';

import { OnChangeEvent } from '../../../lib/events/types/change';
import { getEventValue } from '../../../lib/events/types/get_checked_value';

type ParseTarget = 'search_tweets' | 'profile' | string;

export const $parseTarget = createStore<ParseTarget>(SEARCH_TWEETS);
const $tweetsCount = createStore<number>(10);

export const parseTargetChanged = createEvent<OnChangeEvent>();
export const tweetsCountChanged = createEvent<OnChangeEvent>();

$parseTarget.on(
  parseTargetChanged.map(getEventValue),
  (_, parseTarget: ParseTarget) => parseTarget,
);

$tweetsCount.on(
  tweetsCountChanged.map(getEventValue),
  (prevCount, count: string) => {
    const actualTweetsCount = Number(count);

    if (Number.isNaN(actualTweetsCount)) {
      return prevCount;
    }

    return actualTweetsCount;
  },
);

export const $controls = combine({
  parseTarget: $parseTarget,
  tweetsCount: $tweetsCount,
});
