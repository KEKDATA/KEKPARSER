import * as React from 'react';
import styled from 'styled-components';

import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { MemoizedTweets } from '../tweets';
import { Tweet } from '../tweet';

import { TweetSkeleton } from '../../../UI/skeleton/tweet';
import { TweetsSkeleton } from '../../../UI/skeleton/tweets';

import {
  FinalConvertedTweet,
  NormalizedTweetInfo,
} from '../../../types/tweets';
import { CsvConvert } from '../../csv_convert';

const ParseInfoContainer = styled.div`
  display: grid;
  grid-template-columns: 30% 40% 30%;
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

const ConvertContainer = styled(Grid)`
  margin-bottom: 10px;
`;

export const TweetsInfo: React.FC<{
  infoOptions: NormalizedTweetInfo;
  tweetsToConvert: Array<FinalConvertedTweet>;
  isLoading: boolean;
  convertText: string;
}> = ({
  infoOptions: {
    finalTweets,
    tweetWithMinCoefficient,
    tweetWithMaxCoefficient,
    isExistMin,
    isExistMax,
    meanSentiment,
    isMeanSentimentExist,
  },
  isLoading,
  convertText,
  tweetsToConvert,
}) => {
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
          <ConvertContainer container justify="center">
            <CsvConvert convertData={tweetsToConvert} text={convertText} />
          </ConvertContainer>
          {isMeanSentimentExist && (
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
              <MemoizedTweets finalTweets={finalTweets} />
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
