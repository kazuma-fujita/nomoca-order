import { Box, Typography } from '@mui/material';
import { SingleOrderForm } from 'components/organisms/single-orders/single-order-form';

export const SingleOrderFormTemplate = () => {
  return (
    <>
      <Typography variant='h5' textAlign='center'>
        注文を入力する
      </Typography>
      <Box mb={8} />
      <SingleOrderForm />
    </>
  );
};
