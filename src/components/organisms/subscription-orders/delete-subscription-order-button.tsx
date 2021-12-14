import { Delete } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { ModelSubscriptionOrderProductConnection } from 'API';
import { useDeleteSubscriptionOrder } from 'hooks/subscription-orders/use-delete-subscription-order';
import { useCallback } from 'react';
import { useToggle } from 'react-use';
import { DeleteSubscriptionOrderDialog } from './delete-subscription-order-dialog';

type Props = {
  id: string;
  products: ModelSubscriptionOrderProductConnection;
};

export const DeleteSubscriptionOrderButton = (props: Props) => {
  const { deleteSubscriptionOrder, isLoading, error, resetState } = useDeleteSubscriptionOrder();
  const [on, toggle] = useToggle(false);

  const cancelHandler = useCallback(() => {
    resetState();
    toggle();
  }, [resetState, toggle]);

  const submitHandler = useCallback(async () => {
    const error = await deleteSubscriptionOrder(props.id, props.products);
    if (!error) {
      toggle();
    }
  }, [deleteSubscriptionOrder, props.id, props.products, toggle]);

  const label = '解約';

  return (
    <>
      <Button onClick={toggle} variant='outlined' color='error' startIcon={<Delete fontSize='small' />} size='small'>
        {label}
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
