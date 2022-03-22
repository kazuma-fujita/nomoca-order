import { Box, Chip, Divider, Typography } from '@mui/material';
import { ConfirmOrder } from 'components/organisms/orders/confirm-order';
import { useConfirmOrder } from 'hooks/orders/use-confirm-order';

export const ConfirmSubscriptionOrder = () => {
  const {
    products,
    deliveryStartLabel,
    deliveryIntervalLabel,
    staffName,
    isLoading,
    error,
    submitHandler,
    cancelHandler,
  } = useConfirmOrder();

  return (
    <ConfirmOrder
      products={products}
      staffName={staffName}
      isLoading={isLoading}
      error={error}
      submitHandler={submitHandler}
      cancelHandler={cancelHandler}
    >
      <Divider textAlign='left'>
        <Chip label='配送開始月' />
      </Divider>
      <Box mt={2} mb={4} ml={4}>
        <Typography variant='body2'>{deliveryStartLabel}</Typography>
      </Box>
      <Divider textAlign='left'>
        <Chip label='配送頻度' />
      </Divider>
      <Box mt={2} mb={4} ml={4}>
        <Typography variant='body2'>{deliveryIntervalLabel}</Typography>
      </Box>
    </ConfirmOrder>
  );
};
