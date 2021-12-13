import { Grid } from '@mui/material';
import { Main } from 'components/molecules/main';
import { CreateSubscriptionOrderButton } from 'components/organisms/subscription-orders/create-subscription-order-button';
import { SubscriptionOrderListContainer } from 'components/organisms/subscription-orders/subscription-order-list/subscription-order-list-container';

export const SubscriptionOrderTemplate = () => {
  return (
    <Main>
      <Grid container spacing={2} direction='column'>
        <Grid item>
          <Grid container justifyContent='flex-end'>
            <CreateSubscriptionOrderButton />
          </Grid>
        </Grid>
        <Grid item>
          <SubscriptionOrderListContainer />
        </Grid>
      </Grid>
    </Main>
  );
};
