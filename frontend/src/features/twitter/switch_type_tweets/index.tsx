import * as React from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';

import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

import { LatestTweets } from '../latest_tweets';

import { $switchTypes, latestStatusToggled, topStatusToggled } from './model';
import { TopTweets } from '../top_tweets';

const ButtonGroupContainer = styled(Grid)`
  margin: 20px 0;
`;

const StyledButton = styled(Button)<{ isActive: boolean }>`
  opacity: ${({ isActive }) => (isActive ? 1 : 0.7)};
  &:hover {
    opacity: 1;
  }
`;

export const SwitchTypeTweets: React.FC = () => {
  const { isLatest, isTop } = useStore($switchTypes);

  return (
    <>
      <ButtonGroupContainer container justify="center">
        <ButtonGroup
          variant="contained"
          color="primary"
          aria-label="contained primary button group">
          <StyledButton isActive={isTop} onClick={topStatusToggled}>
            Top
          </StyledButton>
          <StyledButton isActive={isLatest} onClick={latestStatusToggled}>
            Latest
          </StyledButton>
        </ButtonGroup>
      </ButtonGroupContainer>
      {isTop && <TopTweets />}
      {isLatest && <LatestTweets />}
    </>
  );
};
