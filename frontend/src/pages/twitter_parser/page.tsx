import * as React from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { ParseTarget } from '../../features/twitter/parse_target';
import { TwitterControls } from '../../features/twitter/controls';
import { Settings } from '../../features/twitter/settings';

import { sendParserOptions } from './model';
import { $socketMessage } from '../../socket';

const StyledContainer = styled(Container)`
  padding: 10px 5px;
`;

export const TwitterParser: React.FC = () => {
  const socketMassage = useStore($socketMessage);

  console.log(socketMassage);

  return (
    <StyledContainer maxWidth="md">
      <ParseTarget />
      <TwitterControls />
      <Settings />
      <Grid container justify="center" spacing={4}>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            onClick={sendParserOptions}>
            Submit parse options
          </Button>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};
