import * as React from 'react';
import { useStore } from 'effector-react';
import styled from 'styled-components';

import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { $profileInfo } from './model';
import { checkIsNumberExist } from '../../../../../lib/is_number_exist';
import { ProfileSkeleton } from '../../../../../UI/skeleton/profile';

const Info = styled(Typography)`
  padding-right: 10px;
`;

const Container = styled(Grid)`
  max-width: 800px;
`;

const TwitterAvatar = styled(Avatar)`
  min-width: 90px;
  min-height: 90px;
`;

const Description = styled(Grid)`
  margin-bottom: 4px;
`;

const DescriptionPart = styled.span`
  font-size: 18px;
  padding: 0 5px 4px 0;
`;

export const ProfileInfo: React.FC = () => {
  const { profileInfo, isLoading } = useStore($profileInfo);

  if (isLoading === null) {
    return null;
  }

  const {
    activityInfo,
    classifierData,
    contactInfo,
    description,
    name,
    sentimentCoefficient,
    tweetName,
    avatarUrl,
  } = profileInfo;

  return (
    <Grid container justify="center" direction="column" alignItems="center">
      {isLoading && <ProfileSkeleton />}
      {!isLoading && (
        <Container container direction="column">
          <TwitterAvatar src={avatarUrl} alt={name} />
          <Grid container direction="column">
            {name && <Typography variant="h6">{name}</Typography>}
            {tweetName && (
              <Typography variant="subtitle1" gutterBottom>
                {tweetName}
              </Typography>
            )}
          </Grid>
          {description.length > 0 && (
            <Description container direction="row">
              {description.map(({ text, isUrl, url, id }) => (
                <DescriptionPart key={id}>
                  {isUrl ? <Link href={url}>{text}</Link> : text}
                </DescriptionPart>
              ))}
            </Description>
          )}
          <Grid container direction="row">
            {contactInfo.map(({ id, info }) => (
              <Info key={id} gutterBottom>
                {info}
              </Info>
            ))}
          </Grid>
          <Grid container direction="row">
            {activityInfo.map(({ id, info }) => (
              <Info key={id} gutterBottom>
                {info}
              </Info>
            ))}
          </Grid>
          <Grid container direction="column">
            {checkIsNumberExist(sentimentCoefficient) && (
              <Info gutterBottom>Sentiment: {sentimentCoefficient}</Info>
            )}
            {classifierData && (
              <Info gutterBottom>Naive Bayes: {classifierData}</Info>
            )}
          </Grid>
        </Container>
      )}
    </Grid>
  );
};
