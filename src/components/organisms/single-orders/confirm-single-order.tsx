import { Box, Chip, Divider, Typography } from '@mui/material';
import { ConfirmOrder } from 'components/organisms/orders/confirm-order';
import { useConfirmOrder } from 'hooks/orders/use-confirm-order';

export const ConfirmSingleOrder = () => {
  const { products, deliveryTypeLabel, staffName, isLoading, error, submitHandler } = useConfirmOrder();

  return (
    <ConfirmOrder
      products={products}
      staffName={staffName}
      isLoading={isLoading}
      error={error}
      submitHandler={submitHandler}
    >
      <Divider textAlign='left'>
        <Chip label='配送方法' />
      </Divider>
      <Box mt={2} mb={8} ml={4}>
        <Typography variant='body1'>{deliveryTypeLabel}</Typography>
      </Box>
    </ConfirmOrder>
  );
};
