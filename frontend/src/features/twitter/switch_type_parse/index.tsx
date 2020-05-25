import * as React from 'react';
import { useStore } from 'effector-react';

import { SwitchTypeSearchTweets } from './search_tweets';

import { $parseTarget } from '../controls/model';
import { PROFILE, SEARCH_TWEETS } from '../../../constants/parse_target';

export const SwitchTypeParse: React.FC = () => {
  const parseTarget = useStore($parseTarget);

  return (
    <>
      {parseTarget === PROFILE && <h1> PROFILE! </h1>}
      {parseTarget === SEARCH_TWEETS && <SwitchTypeSearchTweets />}
    </>
  );
};
