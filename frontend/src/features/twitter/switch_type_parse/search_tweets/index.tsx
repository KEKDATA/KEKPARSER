import * as React from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';

import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import { LatestTweets } from '../../latest_tweets';
import { TopTweets } from '../../top_tweets';

import { $tweetsParseType, tweetsParseTypeChanged } from './model';
import { $searchTweetsSettings } from '../../settings/search_tweets/model';

const ButtonGroupContainer = styled(Grid)`
  margin: 20px 0;
`;

const PARSE_TOP_TYPE = 'top';
const PARSE_LATEST_TYPE = 'latest';

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
              <ToggleButton value="top" aria-label="top">
                Top
              </ToggleButton>
            )}
            {isLatest && (
              <ToggleButton value="latest" aria-label="latest">
                Latest
              </ToggleButton>
            )}
          </ToggleButtonGroup>
        </ButtonGroupContainer>
      )}
      {tweetsParseType === PARSE_TOP_TYPE && <TopTweets />}
      {tweetsParseType === PARSE_LATEST_TYPE && <LatestTweets />}
    </>
  );
};
