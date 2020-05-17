import * as React from 'react';
import { useStore } from 'effector-react';

import { $latestTweets } from './model';

import { ParseInfo } from '../parse_info';

export const LatestTweets: React.FC = () => {
  const latestTweets = useStore($latestTweets);

  return <ParseInfo infoOptions={latestTweets} />;
};
