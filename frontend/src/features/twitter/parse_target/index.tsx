import * as React from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

import { $parseTargets, searchTargetChanged } from './model';

const StyledSearchGrid = styled(Grid)`
  min-width: 400px;

  #search {
    white-space: nowrap;
  }
`;

const StyledLinkGrid = styled(Grid)`
  min-height: 45px;
`;

export const ParseTarget = () => {
  const { labelParseTarget, searchTarget, parseUrl } = useStore($parseTargets);

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      direction="column"
      spacing={2}>
      <StyledSearchGrid item>
        <TextField
          label={labelParseTarget}
          value={searchTarget}
          onChange={searchTargetChanged}
          multiline
          rowsMax={4}
          fullWidth
          id="search"
        />
      </StyledSearchGrid>
      <StyledLinkGrid item>
        <Link href={parseUrl}>
          <Typography gutterBottom variant="subtitle2">
            {parseUrl}
          </Typography>
        </Link>
      </StyledLinkGrid>
    </Grid>
  );
};
