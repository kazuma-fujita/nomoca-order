import { Box, Grid } from '@mui/material';
import { SubscriptionOrderHistorySearchForm } from 'components/organisms/admins/subscription-order-histories/subscription-order-history-search-form';
import { SubscriptionOrderHistoryList } from 'components/organisms/subscription-order-histories/subscription-order-list/subscription-order-history-list';

export const SubscriptionOrderHistoryTemplate = () => {
  return (
    <Grid container spacing={2} direction='column'>
      <Grid item>
        <Grid item>
          <>
            <Box width='auto' display='flex' justifyContent='center' mb={4}>
              <SubscriptionOrderHistorySearchForm />
            </Box>
            <SubscriptionOrderHistoryList />
          </>
        </Grid>
      </Grid>
    </Grid>
  );
};
