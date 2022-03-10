import { Grid } from '@mui/material';
import { OrderType } from 'API';
import { CreateOrderButton } from 'components/organisms/orders/create-order-button';
import { SingleOrderList } from 'components/organisms/single-orders/single-order-list/single-order-list';
import { SubscriptionOrderList } from 'components/organisms/subscription-orders/subscription-order-list/subscription-order-list';
import { useOrderFormParam } from 'stores/use-order-form-param';

export const OrderListTemplate = () => {
  const { orderType } = useOrderFormParam();
  return (
    <Grid container spacing={2} direction='column'>
      <Grid item>
        <Grid container justifyContent='flex-end'>
          <CreateOrderButton />
        </Grid>
      </Grid>
      <Grid item>
        <Grid item>{orderType === OrderType.singleOrder ? <SingleOrderList /> : <SubscriptionOrderList />}</Grid>
      </Grid>
    </Grid>
  );
};
