import React from 'react';
import styled from 'styled-components';

import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';

const SkeletonWrapper = styled.div`
  margin: 16px;
`;

const Title = styled.div`
  display: flex;
`;

const UserNameSkeleton = styled(Skeleton)`
  margin-left: 10px;
`;

const OptionSkeleton = styled(Skeleton)`
  margin-right: 16px;
`;

export const TweetSkeleton = () => (
  <SkeletonWrapper>
    <Title>
      <Skeleton animation="wave" width={100} height={25} />
      <UserNameSkeleton animation="wave" width={100} height={25} />
    </Title>
    <Skeleton animation="wave" height={25} />
    <Skeleton animation="wave" height={25} />
    <Skeleton animation="wave" height={25} />
    <Skeleton animation="wave" height={25} />
    <Grid container>
      <OptionSkeleton animation="wave" width={100} height={25} />
      <OptionSkeleton animation="wave" width={100} height={25} />
      <OptionSkeleton animation="wave" width={100} height={25} />
    </Grid>
    <Skeleton animation="wave" width={200} height={25} />
    <Skeleton animation="wave" width={200} height={25} />
  </SkeletonWrapper>
);
