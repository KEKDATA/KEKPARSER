import * as React from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import { ParseTarget } from '../parse_target';
import { TwitterControls } from '../controls';
import { Settings } from '../settings';
import { $isDisabled, sendParserOptions } from './model';

const StyledContainer = styled(Container)`
  padding: 10px 5px;
`;

export const ParseSettings: React.FC = () => {
  const isDisabled = useStore($isDisabled);

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
            disabled={isDisabled}
            onClick={sendParserOptions}>
            Submit parse options
          </Button>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};
