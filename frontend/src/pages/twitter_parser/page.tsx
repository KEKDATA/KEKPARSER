import * as React from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';

import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { $parseStore, parseTargetChanged, tweetsCountChanged } from './model';

import { ProfileSettings } from '../../features/twitter_settings/profile';
import { TweetsSettings } from '../../features/twitter_settings/tweets';
import { PROFILE, SEARCH_TWEETS } from '../../constants/parse_target';
import { ParseTarget } from '../../features/twitter_settings/parse_target';

const StyledContainer = styled(Container)`
  padding: 10px 5px;
`;

const StyledTweetsCountGrid = styled(Grid)`
  max-width: 100px;

  #tweets_count-label {
    white-space: nowrap;
  }
`;

export const TwitterParser: React.FC = () => {
  const { parseTarget, tweetsCount } = useStore($parseStore);

  return (
    <StyledContainer maxWidth="md">
      <ParseTarget />
      <Grid container justify="center" alignItems="center" spacing={4}>
        <StyledTweetsCountGrid item>
          <TextField
            id="tweets_count"
            label="Tweets count"
            type="text"
            inputProps={{ pattern: '[0-9]*' }}
            onChange={tweetsCountChanged}
            value={tweetsCount}
          />
        </StyledTweetsCountGrid>
        <Grid item>
          <RadioGroup
            aria-label="Parse target"
            name="parse_target"
            row
            value={parseTarget}
            onChange={parseTargetChanged}>
            <FormControlLabel
              value="profile"
              control={<Radio />}
              label="Profile"
            />
            <FormControlLabel
              value="search_tweets"
              control={<Radio />}
              label="Search tweets"
            />
          </RadioGroup>
        </Grid>
      </Grid>
      <Grid container justify="center" alignItems="center" spacing={4}>
        <Grid item>
          {parseTarget === PROFILE && <ProfileSettings />}
          {parseTarget === SEARCH_TWEETS && <TweetsSettings />}
        </Grid>
      </Grid>
    </StyledContainer>
  );
};
