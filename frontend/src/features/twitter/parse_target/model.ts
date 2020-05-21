import { combine, createEvent, createStore } from 'effector';

import { PROFILE, SEARCH_TWEETS } from '../../../constants/parse_target';

import { getEventValue } from '../../../lib/events/types/get_checked_value';
import { OnChangeEvent } from '../../../lib/events/types/change';

import { $parseTarget } from '../controls/model';

const TWITTER_URL = 'https://twitter.com/';

const getActualValueByParseTarget = (
  target: string,
  searchTweetsValue: string,
  profileValue: string,
) => {
  let value = '';

  switch (target) {
    case SEARCH_TWEETS: {
      value = searchTweetsValue;
      break;
    }

    case PROFILE: {
      value = profileValue;
      break;
    }

    default: {
      break;
    }
  }

  return value;
};

const $searchTarget = createStore<string>('');
const $labelParseTarget = $parseTarget.map(target =>
  getActualValueByParseTarget(
    target,
    'What kind of search tweets?',
    'Enter profile name',
  ),
);
const $prefixParseUrl = $parseTarget.map(target =>
  getActualValueByParseTarget(target, `${TWITTER_URL}search?q=`, TWITTER_URL),
);
const $parseUrl = combine($prefixParseUrl, $searchTarget).map(
  combinedParseUrl => {
    const [prefixParseUrl, searchTarget] = combinedParseUrl;

    if (prefixParseUrl.length === 0 || searchTarget.length === 0) {
      return '';
    }

    return `${prefixParseUrl}${searchTarget.replace(/ /g, '%20')}`;
  },
);

export const searchTargetChanged = createEvent<OnChangeEvent>();

$searchTarget.on(
  searchTargetChanged.map(getEventValue),
  (_, value: string) => value,
);

export const $parseTargets = combine({
  labelParseTarget: $labelParseTarget,
  searchTarget: $searchTarget,
  parseUrl: $parseUrl,
});
