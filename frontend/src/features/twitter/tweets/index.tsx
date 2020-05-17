import * as React from 'react';
import { useStore } from 'effector-react';

import Grid from '@material-ui/core/Grid';

import { $finalTweets } from './model';
import { Tweet } from '../tweet';

export const Tweets: React.FC = () => {
  const finalTweets = useStore($finalTweets);

  return (
    <Grid container direction="column">
      {finalTweets.map(tweetOptions => (
        <Tweet key={tweetOptions.id} tweetOptions={tweetOptions} />
      ))}
    </Grid>
  );
};

export const MemoizedTweets = React.memo(Tweets);
