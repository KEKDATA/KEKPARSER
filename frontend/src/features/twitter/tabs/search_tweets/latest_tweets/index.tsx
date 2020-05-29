import * as React from 'react';
import { useStore } from 'effector-react';

import { $latestTweets } from './model';

import { TweetsInfo } from '../../../tweets_info';

export const LatestTweets: React.FC = () => {
  const { tweets, isLoading } = useStore($latestTweets);

  if (isLoading === null) {
    return null;
  }

  return <TweetsInfo infoOptions={tweets} isLoading={isLoading} />;
};
