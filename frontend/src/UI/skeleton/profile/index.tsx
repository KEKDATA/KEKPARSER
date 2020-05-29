import * as React from 'react';
import styled from 'styled-components';

import Skeleton from '@material-ui/lab/Skeleton';

const SkeletonContainer = styled.div`
  width: 800px;
  display: flex;
  flex-direction: column;
`;

export const ProfileSkeleton: React.FC = () => {
  return (
    <SkeletonContainer>
      <Skeleton variant="circle" width={90} height={90} />
      <Skeleton variant="text" height={32} width={200} />
      <Skeleton variant="text" height={28} width={100} />
      <Skeleton variant="text" height={22} width={800} />
      <Skeleton variant="text" height={22} width={800} />
      <Skeleton variant="text" height={24} width={300} />
      <Skeleton variant="text" height={24} width={300} />
      <Skeleton variant="text" height={24} width={150} />
      <Skeleton variant="text" height={24} width={150} />
    </SkeletonContainer>
  );
};
