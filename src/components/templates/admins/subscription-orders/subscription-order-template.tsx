import { Grid } from '@mui/material';
import { SubscriptionOrder } from 'API';
import { SubscriptionOrderSearchFormContainer } from 'components/organisms/admins/subscription-orders/search-form/subscription-order-search-form-container';
import { SubscriptionOrderList } from 'components/organisms/admins/subscription-orders/subscription-order-list';
import { FetchResponse } from 'hooks/swr/use-fetch';

type Props = FetchResponse<SubscriptionOrder[]> & {};

export const SubscriptionOrderTemplate = (props: Props) => (
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
