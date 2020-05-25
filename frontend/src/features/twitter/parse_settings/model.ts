import { attach, combine } from 'effector';

import { onMessage, sendFx } from '../../../socket';

import { $controls } from '../controls/model';
import { $parseTargets } from '../parse_target/model';
import { $profileSettings } from '../settings/profile/model';
import { $searchTweetsSettings } from '../settings/search_tweets/model';

import { PROFILE, SEARCH_TWEETS } from '../../../constants/parse_target';

const $requestParams = combine({
  controls: $controls,
  parseTargets: $parseTargets,
  profileSettings: $profileSettings,
  searchTweetsSettings: $searchTweetsSettings,
});
export const $isDisabled = $requestParams.map(
  ({
    parseTargets: { parseUrl },
    controls: { parseTarget, tweetsCount },
    profileSettings,
    searchTweetsSettings,
  }) => {
    const isParseUrlSelected = parseUrl.length > 0;
    const isTweetsCountSelected = tweetsCount > 0;
    let settings = {};

    switch (parseTarget) {
      case PROFILE: {
        settings = profileSettings;
        break;
      }

      case SEARCH_TWEETS: {
        settings = searchTweetsSettings;
        break;
      }

      default: {
        break;
      }
    }

    const isSomeSettingSelected = Object.values(settings).some(
      setting => setting,
    );

    const isDisabled =
      !isParseUrlSelected || !isSomeSettingSelected || !isTweetsCountSelected;

    return isDisabled;
  },
);

$isDisabled.on(sendFx.done, () => true);
$isDisabled.on(onMessage, () => false);

export const sendParserOptions = attach({
  effect: sendFx,
  source: $requestParams,
  mapParams: (
    _,
    {
      controls: { parseTarget, tweetsCount },
      parseTargets: { parseUrl },
      profileSettings,
      searchTweetsSettings,
    },
  ) => {
    const params = {
      parseTarget,
      tweetsCount,
      parseUrl,
    };

    switch (parseTarget) {
      case PROFILE: {
        return {
          ...params,
          profileSettings,
        };
      }

      case SEARCH_TWEETS: {
        return {
          ...params,
          tweetsSettings: searchTweetsSettings,
        };
      }

      default: {
        return {};
      }
    }
  },
});
