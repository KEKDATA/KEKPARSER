import * as React from 'react';
import { useStore } from 'effector-react';
import styled from 'styled-components';

import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';

import retweetIcon from '../../../assets/icons/retweet.svg';
import replyIcon from '../../../assets/icons/reply.svg';

import { $tweets } from './model';

const TweetIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const TweetName = styled(Typography)`
  padding-left: 5px;
`;

const OptionTweetContainer = styled(Grid)`
  display: flex;
  flex-direction: row;
`;

const OptionTweetInfo = styled(Typography)`
  padding: 2px 2px 0 8px;
`;

export const Tweets: React.FC = () => {
  const tweets = useStore($tweets);

  return (
    <Grid container direction="column" spacing={4}>
      {tweets.map(
        ({
          id,
          likes,
          name,
          replies,
          replyingUsers,
          retweets,
          tweetBayes,
          tweetContent,
          tweetName,
          tweetSentiment,
          userUrl,
        }) => (
          <Grid item key={id}>
            <Grid container direction="row" alignItems="center">
              <Link href={userUrl}>{name}</Link>
              <TweetName>{tweetName}</TweetName>
            </Grid>
            <Typography gutterBottom>{tweetContent}</Typography>
            {replyingUsers && replyingUsers.length > 0 && (
              <Typography gutterBottom>{replyingUsers.length}</Typography>
            )}
            <Grid container spacing={4}>
              <OptionTweetContainer item>
                <FavoriteIcon color="secondary" />
                <OptionTweetInfo display="inline" gutterBottom>
                  {likes}
                </OptionTweetInfo>
              </OptionTweetContainer>
              <OptionTweetContainer item>
                <TweetIcon
                  src={replyIcon}
                  alt="reply icon"
                  title="reply icon"
                />
                <OptionTweetInfo display="inline" gutterBottom>
                  {replies}
                </OptionTweetInfo>
              </OptionTweetContainer>
              <OptionTweetContainer item>
                <TweetIcon
                  src={retweetIcon}
                  alt="retweets icon"
                  title="retweets icon"
                />
                <OptionTweetInfo display="inline" gutterBottom>
                  {retweets}
                </OptionTweetInfo>
              </OptionTweetContainer>
            </Grid>
            <Typography gutterBottom>
              Naive bayes classifier: {tweetBayes}
            </Typography>
            <Typography gutterBottom>
              Sentiment analysis: {tweetSentiment}
            </Typography>
          </Grid>
        ),
      )}
    </Grid>
  );
};