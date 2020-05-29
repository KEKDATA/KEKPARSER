import { attach, combine } from 'effector';

import { onMessage, sendFx } from '../../../socket';

import { $controls } from '../controls/model';
import { $parseTargets } from '../parse_target/model';
import { $profileSettings } from '../settings/profile/model';
import { $searchTweetsSettings } from '../settings/search_tweets/model';

import { PROFILE, SEARCH_TWEETS } from '../../../constants/parse_target';
import { $isLoadingLatestTweets } from '../tabs/search_tweets/latest_tweets/model';
import { $isLoadingTopTweets } from '../tabs/search_tweets/top_tweets/model';
import { $isLoadingProfileInfo } from '../tabs/profile/profile_info/model';
import { $isLoadingProfileTweets } from '../tabs/profile/tweets/model';
import { $isLoadingTweetsAndReplies } from '../tabs/profile/tweets_and_replies/model';

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

const $isLoadedTweets = combine({
  isLoadingLatestTweets: $isLoadingLatestTweets,
  isLoadingTopTweets: $isLoadingTopTweets,
  isLoadingProfileInfo: $isLoadingProfileInfo,
  isLoadingProfileTweets: $isLoadingProfileTweets,
  isLoadingTweetsAndReplies: $isLoadingTweetsAndReplies,
  profileSettings: $profileSettings,
  searchTweetsSettings: $searchTweetsSettings,
  controls: $controls,
});
// FIXME: Пересмотреть логику дизейбла кнопки
//  Сейчас идет привязка к лоадерам процессов парсинга
$isDisabled.on(
  $isLoadedTweets,
  (
    previousState,
    {
      profileSettings,
      searchTweetsSettings,
      controls: { parseTarget },
      ...loadingTweets
    },
  ) => {
    let isLoaded = false;

    switch (parseTarget) {
      case PROFILE: {
        const {
          isLoadingTweetsAndReplies,
          isLoadingProfileInfo,
          isLoadingProfileTweets,
        } = loadingTweets;
        const { isTweets, isTweetsAndReplies, isProfileInfo } = profileSettings;

        const loaders = [
          {
            loader: isLoadingTweetsAndReplies,
            isOptionActive: isTweetsAndReplies,
          },
          { loader: isLoadingProfileInfo, isOptionActive: isProfileInfo },
          { loader: isLoadingProfileTweets, isOptionActive: isTweets },
        ];

        isLoaded = loaders
          .filter(({ isOptionActive }) => isOptionActive)
          .every(({ loader }) => loader === false);

        break;
      }

      case SEARCH_TWEETS: {
        const { isLoadingLatestTweets, isLoadingTopTweets } = loadingTweets;
        const { isLatest, isTop } = searchTweetsSettings;

        const loaders = [
          { loader: isLoadingLatestTweets, isOptionActive: isLatest },
          { loader: isLoadingTopTweets, isOptionActive: isTop },
        ];

        isLoaded = loaders
          .filter(({ isOptionActive }) => isOptionActive)
          .every(({ loader }) => loader === false);

        break;
      }

      default: {
        break;
      }
    }

    if (isLoaded) {
      return false;
    }

    return previousState;
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
