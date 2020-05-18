import * as React from 'react';
import { useStore } from 'effector-react';

import { $topTweets } from './model';

import { ParseInfo } from '../parse_info';

export const TopTweets: React.FC = () => {
  const { tweets, isLoading } = useStore($topTweets);

  if (isLoading === null) {
    return null;
  }

  return <ParseInfo infoOptions={tweets} isLoading={isLoading} />;
};
