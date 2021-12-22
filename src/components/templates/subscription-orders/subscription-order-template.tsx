import { Grid } from '@mui/material';
import { CreateSubscriptionOrderButton } from 'components/organisms/subscription-orders/create-subscription-order/create-subscription-order-button';
import { ReactElement } from 'react';

type Props = {
  listComponent: ReactElement;
  now: Date;
};

export const SubscriptionOrderTemplate = ({ listComponent, now }: Props) => (
  <Grid container spacing={2} direction='column'>
    <Grid item>
      <Grid container justifyContent='flex-end'>
        <CreateSubscriptionOrderButton now={now} />
      </Grid>
    </Grid>
    <Grid item>
      <Grid item>{listComponent}</Grid>
    </Grid>
  </Grid>
);
