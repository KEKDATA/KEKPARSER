import * as React from 'react';
import { useStore } from 'effector-react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { $profileInfo } from './model';
import { checkIsNumberExist } from '../../../../../lib/is_number_exist';

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
        <Grid container>
          {activityInfo.map(({ id, info }) => (
            <Typography key={id} gutterBottom>
              {info}
            </Typography>
          ))}
          {classifierData && (
            <Typography gutterBottom>
              Naive bayes classifier: {classifierData}
            </Typography>
          )}
          {contactInfo.map(({ id, info }) => (
            <Typography key={id} gutterBottom>
              {info}
            </Typography>
          ))}
          {description && (
            <Typography gutterBottom>Description: {description}</Typography>
          )}
          {name && <Typography gutterBottom>Name: {name}</Typography>}
          {tweetName && (
            <Typography gutterBottom>Tweet Name: {tweetName}</Typography>
          )}
          {checkIsNumberExist(sentimentCoefficient) && (
            <Typography gutterBottom>
              Sentiment analysis: {sentimentCoefficient}
            </Typography>
          )}
        </Grid>
      )}
    </Grid>
  );
};
