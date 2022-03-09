import { Grid } from '@mui/material';
import { CreateOrderButton } from 'components/organisms/orders/create-order-button';
import { SubscriptionOrderList } from 'components/organisms/subscription-orders/subscription-order-list/subscription-order-list';

export const SubscriptionOrderListTemplate = () => {
  return (
    <Grid container spacing={2} direction='column'>
      <Grid item>
        <Grid container justifyContent='flex-end'>
          <CreateOrderButton />
        </Grid>
      </Grid>
      <Grid item>
        <Grid item>
          <SubscriptionOrderList />
        </Grid>
      </Grid>
    </Grid>
  );
};
