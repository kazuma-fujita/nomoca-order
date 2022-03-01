import { Grid } from '@mui/material';
import { CreateSingleOrderButton } from 'components/organisms/single-orders/create-single-order-button';
import { SingleOrderList } from 'components/organisms/single-orders/single-order-list/single-order-list';
import { ExtendedOrder } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { FetchResponse } from 'hooks/swr/use-fetch';
import { Order } from 'API';

export const SingleOrderTemplate = (props: FetchResponse<ExtendedOrder<Order>[]>) => (
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
