import { Grid } from '@mui/material';
import { CreateSingleOrderButton } from 'components/organisms/single-orders/create-single-order-button';
import { SingleOrderList } from 'components/organisms/single-orders/single-order-list/single-order-list';
import { ExtendedOrder } from 'hooks/orders/use-fetch-order-list';
import { FetchResponse } from 'hooks/swr/use-fetch';
import { ReactElement } from 'react';

type Props = {
  listComponent: ReactElement;
};

export const SingleOrderTemplate = (props: FetchResponse<ExtendedOrder[]>) => (
  <Grid container spacing={2} direction='column'>
    <Grid item>
      <Grid container justifyContent='flex-end'>
        <CreateSingleOrderButton />
      </Grid>
    </Grid>
    <Grid item>
      <Grid item>
        <SingleOrderList {...props} />
      </Grid>
    </Grid>
  </Grid>
);
