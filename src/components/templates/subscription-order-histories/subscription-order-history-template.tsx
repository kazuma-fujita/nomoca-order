import { Box, Grid } from '@mui/material';
import { SubscriptionOrderHistoryList } from 'components/organisms/subscription-order-histories/subscription-order-list/subscription-order-history-list';

export const SubscriptionOrderHistoryTemplate = () => {
  return (
    <Grid container spacing={2} direction='column'>
      <Grid item>
        <Grid item>
          <SubscriptionOrderHistoryList />
        </Grid>
      </Grid>
    </Grid>
  );
};
