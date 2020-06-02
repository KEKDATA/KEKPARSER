import * as React from 'react';
import { useStore } from 'effector-react';

import { $likesTweets } from './model';

import { TweetsInfo } from '../../../tweets_info';

export const LikesTweets: React.FC = () => {
  const { tweets, isLoading } = useStore($likesTweets);

  if (isLoading === null) {
    return null;
  }

  return <TweetsInfo infoOptions={tweets} isLoading={isLoading} />;
};
