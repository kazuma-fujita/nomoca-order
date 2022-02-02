import { Grid } from '@mui/material';
import { CreateSingleOrderButton } from 'components/organisms/single-orders/create-single-order-button';
import { ReactElement } from 'react';

type Props = {
  listComponent: ReactElement;
};

export const SingleOrderTemplate = ({ listComponent }: Props) => (
  <Grid container spacing={2} direction='column'>
    <Grid item>
      <Grid container justifyContent='flex-end'>
        <CreateSingleOrderButton />
      </Grid>
    </Grid>
    <Grid item>
      <Grid item>{listComponent}</Grid>
    </Grid>
  </Grid>
);
