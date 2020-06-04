import * as React from 'react';
import { useStore } from 'effector-react';

import { $mediaTweets } from './model';

import { TweetsInfo } from '../../../tweets_info';

export const MediaTweets: React.FC = () => {
  const { tweets, isLoading, tweetsToConvert } = useStore($mediaTweets);

  if (isLoading === null) {
    return null;
  }

  return (
    <TweetsInfo
      infoOptions={tweets}
      isLoading={isLoading}
      tweetsToConvert={tweetsToConvert}
      convertText="Media to CSV"
    />
  );
};
