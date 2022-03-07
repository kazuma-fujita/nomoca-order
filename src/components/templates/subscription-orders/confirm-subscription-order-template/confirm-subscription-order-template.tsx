import { Box, Typography } from '@mui/material';
import { ConfirmSubscriptionOrder } from 'components/organisms/subscription-orders/confirm-subscription-order';

export const ConfirmSubscriptionOrderTemplate = () => {
  return (
    <>
      <Typography variant='h5' textAlign='center'>
        定期便の注文内容を確認する
      </Typography>
      <Box mt={4} mb={4}>
        <Typography variant='body2' textAlign='center'>
          まだ定期便の申し込みは確定していません。 <br />
          <br />
          注文内容をご確認の上、注文するボタンをクリックしてください。
        </Typography>
      </Box>
      <ConfirmSubscriptionOrder />
    </>
  );
};
