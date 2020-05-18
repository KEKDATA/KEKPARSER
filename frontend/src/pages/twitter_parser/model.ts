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
