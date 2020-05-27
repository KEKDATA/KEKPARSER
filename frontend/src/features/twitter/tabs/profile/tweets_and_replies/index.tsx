import * as React from 'react';
import { useStore } from 'effector-react';

import { $profileTweetsAndReplies } from './model';

import { ParseInfo } from '../../../parse_info';

export const ProfileTweetsAndReplies: React.FC = () => {
  const { tweets, isLoading } = useStore($profileTweetsAndReplies);

  if (isLoading === null) {
    return null;
  }

  return <ParseInfo infoOptions={tweets} isLoading={isLoading} />;
};
