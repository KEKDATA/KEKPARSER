import * as React from 'react';
import { useStore } from 'effector-react';

import { $profileTweetsAndReplies } from './model';

import { TweetsInfo } from '../../../tweets_info';

export const ProfileTweetsAndReplies: React.FC = () => {
  const { tweets, isLoading, tweetsToConvert } = useStore(
    $profileTweetsAndReplies,
  );

  if (isLoading === null) {
    return null;
  }

  return (
    <TweetsInfo
      infoOptions={tweets}
      tweetsToConvert={tweetsToConvert}
      isLoading={isLoading}
      convertText="Tweets and replies to CSV"
    />
  );
};
