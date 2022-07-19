import { Delete } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { SubscriptionOrder } from 'API';
import { useDeleteSubscriptionOrder } from 'hooks/subscription-orders/use-delete-subscription-order';
import { ExtendedOrder } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { useCallback } from 'react';
import { useToggle } from 'react-use';
import { DeleteSubscriptionOrderDialog } from './delete-subscription-order-dialog';

type Props = {
  item: ExtendedOrder<SubscriptionOrder>;
};

export const DeleteSubscriptionOrderButton = ({ item }: Props) => {
  const { deleteSubscriptionOrder, isLoading, error, resetState } = useDeleteSubscriptionOrder();
  const [on, toggle] = useToggle(false);

  const cancelHandler = useCallback(() => {
    resetState();
    toggle();
  }, [resetState, toggle]);

  const submitHandler = useCallback(async () => {
    const error = await deleteSubscriptionOrder(item);
    if (!error) {
      toggle();
    }
  }, [deleteSubscriptionOrder, item, toggle]);

  const label = '解約';

  return (
    <>
      <Button onClick={toggle} variant='outlined' color='error' startIcon={<Delete fontSize='small' />} size='small'>
        解約する
      </Button>
      <DeleteSubscriptionOrderDialog
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
