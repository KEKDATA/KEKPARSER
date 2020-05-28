import * as React from 'react';
import { useStore } from 'effector-react';

import { $profileTweets } from './model';

import { TweetsInfo } from '../../../tweets_info';

export const ProfileTweets: React.FC = () => {
  const { tweets, isLoading } = useStore($profileTweets);

  if (isLoading === null) {
    return null;
  }

  return <TweetsInfo infoOptions={tweets} isLoading={isLoading} />;
};
