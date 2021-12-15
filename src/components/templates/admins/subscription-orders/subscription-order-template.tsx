import { Grid } from '@mui/material';
import { SubscriptionOrderSearchFormContainer } from 'components/organisms/admins/subscription-orders/search-form/subscription-order-search-form-container';
import { ReactElement } from 'react';

type Props = {
  listComponent: ReactElement;
};

export const SubscriptionOrderTemplate = ({ listComponent }: Props) => (
  <Grid container spacing={2} direction='column'>
    <Grid item>
      <Grid container justifyContent='center'>
        <SubscriptionOrderSearchFormContainer />
      </Grid>
    </Grid>
    <Grid item>{listComponent}</Grid>
  </Grid>
);
