import { Box, Grid } from '@mui/material';
import { SubscriptionOrderHistoryList } from 'components/organisms/admins/subscription-order-histories/subscription-order-history-list';
import { SubscriptionOrderHistorySearchForm } from 'components/organisms/admins/subscription-order-histories/subscription-order-history-search-form';

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
