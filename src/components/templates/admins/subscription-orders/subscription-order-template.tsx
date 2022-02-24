import { Grid } from '@mui/material';
import { SubscriptionOrder } from 'API';
import { SubscriptionOrderSearchFormContainer } from 'components/organisms/admins/subscription-orders/search-form/subscription-order-search-form-container';
import { SubscriptionOrderList } from 'components/organisms/admins/subscription-orders/subscription-order-list';
import { FetchResponse } from 'hooks/swr/use-fetch';

export const SubscriptionOrderTemplate = (props: FetchResponse<SubscriptionOrder[]>) => (
  <Grid container spacing={2} direction='column'>
    <Grid item>
      <Grid container justifyContent='center'>
        <SubscriptionOrderSearchFormContainer />
      </Grid>
    </Grid>
    <Grid item>
      <SubscriptionOrderList {...props} />
    </Grid>
  </Grid>
);
