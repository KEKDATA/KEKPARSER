import * as React from 'react';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';

import retweetIcon from '../../../assets/icons/retweet.svg';
import replyIcon from '../../../assets/icons/reply.svg';

import { FinalTweet } from '../../../socket';
import { checkIsNumberExist } from '../../../lib/is_number_exist';

const TweetIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const TweetContainer = styled(Grid)`
  padding: 16px 0;
  width: 100%;
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

const RepliesContainer = styled(Grid)`
  margin: 10px 0;
`;

export const Tweet: React.FC<{ tweetOptions: FinalTweet }> = ({
  tweetOptions,
}) => {
  const isTweetExist = Object.values(tweetOptions).length > 0;

  if (!isTweetExist) {
    return null;
  }

  const {
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
  } = tweetOptions;

  return (
    <TweetContainer item>
      <Grid container direction="row" alignItems="center">
        <Link href={userUrl}>{name}</Link>
        <TweetName>{tweetName}</TweetName>
      </Grid>
      <Typography gutterBottom>{tweetContent}</Typography>
      {replyingUsers && replyingUsers.length > 0 && (
        <RepliesContainer container direction="column">
          <Typography gutterBottom>
            Replying users: {replyingUsers.length}
          </Typography>
          {replyingUsers.map(({ user, userLink }) => (
            <Link href={userLink}>{user}</Link>
          ))}
        </RepliesContainer>
      )}
      <Grid container spacing={4}>
        {checkIsNumberExist(likes) && (
          <OptionTweetContainer item>
            <FavoriteIcon color="secondary" />
            <OptionTweetInfo display="inline" gutterBottom>
              {likes}
            </OptionTweetInfo>
          </OptionTweetContainer>
        )}
        {checkIsNumberExist(replies) && (
          <OptionTweetContainer item>
            <TweetIcon src={replyIcon} alt="reply icon" title="reply icon" />
            <OptionTweetInfo display="inline" gutterBottom>
              {replies}
            </OptionTweetInfo>
          </OptionTweetContainer>
        )}
        {checkIsNumberExist(retweets) && (
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
        )}
      </Grid>
      {tweetBayes.length > 0 && (
        <Typography gutterBottom>
          Naive bayes classifier: {tweetBayes}
        </Typography>
      )}
      {checkIsNumberExist(tweetSentiment) && (
        <Typography gutterBottom>
          Sentiment analysis: {tweetSentiment}
        </Typography>
      )}
    </TweetContainer>
  );
};
