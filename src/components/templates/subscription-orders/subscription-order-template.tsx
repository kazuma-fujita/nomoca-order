import { Grid } from '@mui/material';
import { CreateSubscriptionOrderButton } from 'components/organisms/subscription-orders/create-subscription-order/create-subscription-order-button';
import { ReactElement } from 'react';
import { FetchResponse } from 'hooks/swr/use-fetch';
import { ExtendedOrder } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { SubscriptionOrder } from 'API';
import { SubscriptionOrderList } from 'components/organisms/subscription-orders/subscription-order-list/subscription-order-list';

export const SubscriptionOrderTemplate = (props: FetchResponse<ExtendedOrder<SubscriptionOrder>[]>) => (
  <Grid container spacing={2} direction='column'>
    <Grid item>
      <Grid container justifyContent='flex-end'>
        <CreateSubscriptionOrderButton />
      </Grid>
    </Grid>
    <Grid item>
      <Grid item>
        <SubscriptionOrderList {...props} />
      </Grid>
    </Grid>
  </Grid>
);
