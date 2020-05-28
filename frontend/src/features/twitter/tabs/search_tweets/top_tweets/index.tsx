import * as React from 'react';
import { useStore } from 'effector-react';

import { $topTweets } from './model';

import { TweetsInfo } from '../../../tweets_info';

export const TopTweets: React.FC = () => {
  const { tweets, isLoading } = useStore($topTweets);

  if (isLoading === null) {
    return null;
  }

  return <TweetsInfo infoOptions={tweets} isLoading={isLoading} />;
};
