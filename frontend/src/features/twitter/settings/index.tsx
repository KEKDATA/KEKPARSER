import * as React from 'react';
import { useStore } from 'effector-react';

import Grid from '@material-ui/core/Grid';

import { PROFILE, SEARCH_TWEETS } from '../../../constants/parse_target';

import { ProfileSettings } from './profile';
import { SearchTweetsSettings } from './search_tweets';

import { $parseTarget } from '../controls/model';

export const Settings: React.FC = () => {
  const parseTarget = useStore($parseTarget);

  return (
    <Grid container justify="center" alignItems="center" spacing={4}>
      <Grid item>
        {parseTarget === PROFILE && <ProfileSettings />}
        {parseTarget === SEARCH_TWEETS && <SearchTweetsSettings />}
      </Grid>
    </Grid>
  );
};
