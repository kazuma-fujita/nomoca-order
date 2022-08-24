import { Box, Typography } from '@mui/material';
import { OrderType } from 'API';
import { ConfirmOrder } from 'components/organisms/orders/confirm-order';
import { useConfirmOrder } from 'hooks/orders/use-confirm-order';
import { useOrderFormParam } from 'stores/use-order-form-param';

export const ConfirmOrderTemplate = () => {
  const { isLoading, error, submitHandler, cancelHandler } = useConfirmOrder();
  const { orderType, data: formParam } = useOrderFormParam();
  return (
    <>
      <Typography variant='h5' textAlign='center'>
        まだ
        {orderType === OrderType.singleOrder
          ? '注文'
          : formParam && formParam.id
          ? '定期便の内容変更'
          : '定期便の申し込み'}
        は確定していません
      </Typography>
      <Box mt={4} mb={4}>
        <Typography variant='body2' textAlign='center'>
          注文内容をご確認の上、注文するボタンをクリックしてください。
        </Typography>
      </Box>
      <ConfirmOrder isLoading={isLoading} error={error} submitHandler={submitHandler} cancelHandler={cancelHandler} />
    </>
  );
};
