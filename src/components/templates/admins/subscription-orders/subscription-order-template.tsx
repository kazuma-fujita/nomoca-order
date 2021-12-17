import { Grid } from '@mui/material';
import { SubscriptionOrderSearchFormContainer } from 'components/organisms/admins/subscription-orders/search-form/subscription-order-search-form-container';
import { AdminSubscriptionOrderListContextProvider } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { ReactElement } from 'react';

type Props = {
  listComponent: ReactElement;
};

export const SubscriptionOrderTemplate = ({ listComponent }: Props) => (
  <AdminSubscriptionOrderListContextProvider>
    <Grid container spacing={2} direction='column'>
      <Grid item>
        <Grid container justifyContent='center'>
          <SubscriptionOrderSearchFormContainer />
        </Grid>
      </Grid>
      <Grid item>{listComponent}</Grid>
    </Grid>
  </AdminSubscriptionOrderListContextProvider>
);
