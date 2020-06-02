import * as React from 'react';
import { useStore } from 'effector-react';

import { $mediaTweets } from './model';

import { TweetsInfo } from '../../../tweets_info';

export const MediaTweets: React.FC = () => {
  const { tweets, isLoading } = useStore($mediaTweets);

  if (isLoading === null) {
    return null;
  }

  return <TweetsInfo infoOptions={tweets} isLoading={isLoading} />;
};
