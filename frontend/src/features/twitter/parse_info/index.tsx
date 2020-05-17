import * as React from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';

import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { MemoizedTweets } from '../tweets';
import { Tweet } from '../tweet';

import { $tweetsWithCoefficients } from './model';
import { TweetSkeleton } from '../../../UI/skeleton/tweet';
import { TweetsSkeleton } from '../../../UI/skeleton/tweets';

const ParseInfoContainer = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 0.8fr 0.8fr;
  margin: 16px 4px 0 4px;
`;

const Wrapper = styled.div`
  margin: 0 16px;
`;

const TweetsWrapper = styled(Wrapper)`
  margin: 0 8px;
  border-left: 1px solid black;
  border-right: 1px solid black;
  padding: 0 16px;
`;

export const ParseInfo: React.FC = () => {
  const {
    analyzedTweets: {
      tweetWithMinCoefficient,
      tweetWithMaxCoefficient,
      isExistMin,
      isExistMax,
      meanSentiment,
    },
    isLoading,
  } = useStore($tweetsWithCoefficients);

  return (
    <Grid container justify="center" direction="column">
      {isLoading && (
        <>
          <Grid container justify="center">
            <Skeleton animation="wave" height={25} width={150} />
          </Grid>
          <ParseInfoContainer>
            <TweetSkeleton />
            <TweetsSkeleton />
            <TweetSkeleton />
          </ParseInfoContainer>
        </>
      )}
      {!isLoading && (
        <>
          {meanSentiment && (
            <Grid container justify="center">
              <Typography>
                Mean Sentiment coefficient: {meanSentiment}
              </Typography>
            </Grid>
          )}
          <ParseInfoContainer>
            <Wrapper>
              {isExistMin && (
                <>
                  <Typography gutterBottom>
                    Tweet with min Sentiment analyse coefficient:
                  </Typography>
                  <Tweet tweetOptions={tweetWithMinCoefficient} />
                </>
              )}
            </Wrapper>
            <TweetsWrapper>
              <MemoizedTweets />
            </TweetsWrapper>
            <Wrapper>
              {isExistMax && (
                <>
                  <Typography gutterBottom>
                    Tweet with max Sentiment analyse coefficient:
                  </Typography>
                  <Tweet tweetOptions={tweetWithMaxCoefficient} />
                </>
              )}
            </Wrapper>
          </ParseInfoContainer>
        </>
      )}
    </Grid>
  );
};
