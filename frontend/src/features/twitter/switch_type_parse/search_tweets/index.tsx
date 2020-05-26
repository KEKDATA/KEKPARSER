import * as React from 'react';
import { useStore } from 'effector-react';

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import { LatestTweets } from '../../tabs/search_tweets/latest_tweets';
import { TopTweets } from '../../tabs/search_tweets/top_tweets';

import { $tweetsParseType, tweetsParseTypeChanged } from './model';
import { $searchTweetsSettings } from '../../settings/search_tweets/model';
import { LATEST_TWEETS, TOP_TWEETS } from '../../../../constants/tweets_types';
import { ButtonGroupContainer } from '../styled';

export const SwitchTypeSearchTweets: React.FC = () => {
  const tweetsParseType = useStore($tweetsParseType);
  const { isTop, isLatest } = useStore($searchTweetsSettings);

  return (
    <>
      {(isTop || isLatest) && (
        <ButtonGroupContainer container justify="center">
          <ToggleButtonGroup
            value={tweetsParseType}
            exclusive
            onChange={tweetsParseTypeChanged}
            aria-label="Tweets toggle button group">
            {isTop && (
              <ToggleButton value={TOP_TWEETS} aria-label={TOP_TWEETS}>
                Top
              </ToggleButton>
            )}
            {isLatest && (
              <ToggleButton value={LATEST_TWEETS} aria-label={LATEST_TWEETS}>
                Latest
              </ToggleButton>
            )}
          </ToggleButtonGroup>
        </ButtonGroupContainer>
      )}
      {tweetsParseType === TOP_TWEETS && <TopTweets />}
      {tweetsParseType === LATEST_TWEETS && <LatestTweets />}
    </>
  );
};
