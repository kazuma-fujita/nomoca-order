import { Grid } from '@mui/material';
import { CreateSubscriptionOrderButton } from 'components/organisms/subscription-orders/create-subscription-order-button';
import { SubscriptionOrderList } from 'components/organisms/subscription-orders/subscription-order-list/subscription-order-list';

export const SubscriptionOrderListTemplate = () => {
  return (
    <Grid container spacing={2} direction='column'>
      <Grid item>
        <Grid container justifyContent='flex-end'>
          <CreateSubscriptionOrderButton />
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
