import { attach, combine } from 'effector';

import { sendFx } from '../../socket';

import { $controls } from '../../features/twitter/controls/model';
import { $parseTargets } from '../../features/twitter/parse_target/model';
import { $profileSettings } from '../../features/twitter/settings/profile/model';
import { $tweetsSettings } from '../../features/twitter/settings/tweets/model';

import { PROFILE, SEARCH_TWEETS } from '../../constants/parse_target';

const $requestParams = combine({
  controls: $controls,
  parseTargets: $parseTargets,
  profileSettings: $profileSettings,
  tweetsSettings: $tweetsSettings,
});
export const $isDisabled = $requestParams.map(
  ({
    parseTargets: { parseUrl },
    controls: { parseTarget, tweetsCount },
    profileSettings,
    tweetsSettings,
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
        settings = tweetsSettings;
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

export const sendParserOptions = attach({
  effect: sendFx,
  source: $requestParams,
  mapParams: (
    _,
    {
      controls: { parseTarget, tweetsCount },
      parseTargets: { parseUrl },
      profileSettings,
      tweetsSettings,
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
          tweetsSettings,
        };
      }

      default: {
        return {};
      }
    }
  },
});
