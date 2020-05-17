import * as React from 'react';
import { useStore } from 'effector-react';

import { $topTweets } from './model';

import { ParseInfo } from '../parse_info';

export const TopTweets: React.FC = () => {
  const topTweets = useStore($topTweets);

  return <ParseInfo infoOptions={topTweets} />;
};
