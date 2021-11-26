import { StaffList } from 'components/organisms/staffs/staff-list/staff-list';
import { CreateStaffButton } from 'components/organisms/staffs/create-staff-button';
import { Main } from 'components/molecules/main';
import { Grid, Box } from '@mui/material';
import { CreateSubscriptionOrderButton } from 'components/organisms/subscription-orders/create-subscription-order-button';
import { SubscriptionOrderList } from 'components/organisms/subscription-orders/subscription-order-list';

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
          <SubscriptionOrderList />
        </Grid>
      </Grid>
    </Main>
  );
};
