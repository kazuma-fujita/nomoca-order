import { Delete } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { DeliveryStatus, Order } from 'API';
import { useCancelOrder } from 'hooks/orders/use-cancel-order';
import { ExtendedOrder } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { useCallback } from 'react';
import { useToggle } from 'react-use';
import { CancelSingleOrderDialog } from './cancel-single-order-dialog';

type Props = {
  item: ExtendedOrder<Order>;
};

export const CancelSingleOrderButton = ({ item }: Props) => {
  const { cancelOrder, isLoading, error, resetState } = useCancelOrder();
  const [on, toggle] = useToggle(false);

  const cancelHandler = useCallback(() => {
    resetState();
    toggle();
  }, [resetState, toggle]);

  const submitHandler = useCallback(async () => {
    // const error = await cancelOrder(id, products);
    const error = await cancelOrder(item);
    if (!error) {
      toggle();
    }
  }, [cancelOrder, item, toggle]);

  const label = 'キャンセル';

  return (
    <>
      <Button
        onClick={toggle}
        variant='outlined'
        color='error'
        startIcon={<Delete fontSize='small' />}
        size='small'
        disabled={item.deliveryStatus !== DeliveryStatus.ordered}
      >
        注文キャンセル
      </Button>
      <CancelSingleOrderDialog
        label={label}
        on={on}
        isLoading={isLoading}
        error={error}
        submitHandler={submitHandler}
        cancelHandler={cancelHandler}
      />
    </>
  );
};
