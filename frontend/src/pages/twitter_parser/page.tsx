import * as React from 'react';

import { ParseSettings } from '../../features/twitter/parse_settings';
import { SwitchTypeTweets } from '../../features/twitter/switch_type_tweets';

export const TwitterParser: React.FC = () => {
  return (
    <>
      <ParseSettings />
      <SwitchTypeTweets />
    </>
  );
};
