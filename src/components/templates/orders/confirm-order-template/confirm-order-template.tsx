import { Box, Typography } from '@mui/material';
import { OrderType } from 'API';
import { ConfirmSingleOrder } from 'components/organisms/single-orders/confirm-single-order';
import { ConfirmSubscriptionOrder } from 'components/organisms/subscription-orders/confirm-subscription-order';
import { useOrderFormParam } from 'stores/use-order-form-param';

export const ConfirmOrderTemplate = () => {
  const { orderType } = useOrderFormParam();
  return (
    <>
      <Typography variant='h5' textAlign='center'>
        まだ{orderType === OrderType.singleOrder ? '注文' : '定期便の申し込み'}は確定していません
      </Typography>
      <Box mt={4} mb={4}>
        <Typography variant='body2' textAlign='center'>
          {/* まだ{orderType === OrderType.singleOrder ? '注文' : '定期便の申し込み'}は確定していません。 <br />
          <br /> */}
          注文内容をご確認の上、注文するボタンをクリックしてください。
        </Typography>
      </Box>
      {orderType === OrderType.singleOrder ? <ConfirmSingleOrder /> : <ConfirmSubscriptionOrder />}
    </>
  );
};
