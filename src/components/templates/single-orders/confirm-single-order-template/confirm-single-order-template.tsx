import { Box, Typography } from '@mui/material';
import { ConfirmSingleOrder } from 'components/organisms/single-orders/confirm-single-order';
import { SingleOrderForm } from 'components/organisms/single-orders/single-order-form';

export const ConfirmSingleOrderTemplate = () => {
  return (
    <>
      <Typography variant='h5' textAlign='center'>
        注文内容を確認する
      </Typography>
      <Box mt={4} mb={4}>
        <Typography variant='body2' textAlign='center'>
          まだ注文は確定していません。 <br />
          <br />
          注文内容をご確認の上、注文するボタンをクリックしてください。
        </Typography>
      </Box>
      <ConfirmSingleOrder />
    </>
  );
};
