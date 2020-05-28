import * as React from 'react';
import { useStore } from 'effector-react';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { $profileInfo } from './model';
import { checkIsNumberExist } from '../../../../../lib/is_number_exist';

const Info = styled(Typography)`
  padding-right: 10px;
`;

const Container = styled(Grid)`
  max-width: 50%;
`;

export const ProfileInfo: React.FC = () => {
  const { profileInfo, isLoading } = useStore($profileInfo);

  if (isLoading === null) {
    return null;
  }

  console.log(profileInfo);
  const {
    activityInfo,
    classifierData,
    contactInfo,
    description,
    name,
    sentimentCoefficient,
    tweetName,
  } = profileInfo;

  return (
    <Grid container justify="center" direction="column">
      {isLoading && <h1> loading </h1>}
      {!isLoading && (
        <Container container direction="column" alignItems="center">
          <Grid container direction="column">
            {name && <Typography variant="h6">{name}</Typography>}
            {tweetName && (
              <Typography variant="subtitle1" gutterBottom>
                {tweetName}
              </Typography>
            )}
          </Grid>
          {description && <Typography gutterBottom>{description}</Typography>}
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
          <Grid container direction="row">
            {checkIsNumberExist(sentimentCoefficient) && (
              <Info gutterBottom>
                Sentiment analysis: {sentimentCoefficient}
              </Info>
            )}
            {classifierData && (
              <Info gutterBottom>Naive bayes classifier: {classifierData}</Info>
            )}
          </Grid>
        </Container>
      )}
    </Grid>
  );
};
