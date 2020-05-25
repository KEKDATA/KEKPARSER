import * as React from 'react';
import { useStore } from 'effector-react';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import {
  $searchTweetsSettings,
  latestStatusChanged,
  topStatusChanged,
} from './model';

export const SearchTweetsSettings: React.FC = () => {
  const { isTop, isLatest } = useStore($searchTweetsSettings);

  return (
    <>
      <FormControlLabel
        control={
          <Checkbox checked={isTop} onChange={topStatusChanged} name="top" />
        }
        label="Top"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={isLatest}
            onChange={latestStatusChanged}
            name="latest"
          />
        }
        label="Latest"
      />
    </>
  );
};
