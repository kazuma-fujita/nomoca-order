import { Grid } from '@mui/material';
import { CreateOrderButton } from 'components/organisms/orders/create-order-button';
import { SingleOrderList } from 'components/organisms/single-orders/single-order-list/single-order-list';

export const SingleOrderListTemplate = () => {
  return (
    <Grid container spacing={2} direction='column'>
      <Grid item>
        <Grid container justifyContent='flex-end'>
          <CreateOrderButton />
        </Grid>
      </Grid>
      <Grid item>
        <Grid item>
          <SingleOrderList />
        </Grid>
      </Grid>
    </Grid>
  );
};
