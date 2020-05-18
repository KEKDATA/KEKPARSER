import * as React from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

import { $controls, parseTargetChanged, tweetsCountChanged } from './model';

const StyledTweetsCountGrid = styled(Grid)`
  max-width: 100px;

  #tweets_count-label {
    white-space: nowrap;
  }
`;

export const TwitterControls: React.FC = () => {
  const { tweetsCount, parseTarget } = useStore($controls);

  return (
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
  );
};
