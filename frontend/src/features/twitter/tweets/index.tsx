import * as React from 'react';

import Grid from '@material-ui/core/Grid';

import { Tweet } from '../tweet';
import { FinalTweet } from '../../../socket';

export const Tweets: React.FC<{ finalTweets: Array<FinalTweet> }> = ({
  finalTweets,
}) => {
  return (
    <Grid container direction="column">
      {finalTweets.map(tweetOptions => (
        <Tweet key={tweetOptions.id} tweetOptions={tweetOptions} />
      ))}
    </Grid>
  );
};

export const MemoizedTweets = React.memo(Tweets);
