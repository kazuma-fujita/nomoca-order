import { Box, Typography } from '@mui/material';
import { SubscriptionOrderForm } from 'components/organisms/subscription-orders/subscription-order-form';

export const SubscriptionOrderFormTemplate = () => {
  return (
    <>
      <Typography variant='h5' textAlign='center'>
        注文を入力する
      </Typography>
      <Box mb={8} />
      <SubscriptionOrderForm />
    </>
  );
};
