import { Delete } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { ModelOrderProductConnection } from 'API';
import { useDeleteOrder } from 'hooks/orders/use-delete-order';
import { useCallback } from 'react';
import { useToggle } from 'react-use';
import { CancelSingleOrderDialog } from './cancel-single-order-dialog';

type Props = {
  id: string;
  products: ModelOrderProductConnection;
};

export const CancelSingleOrderButton = (props: Props) => {
  const { deleteOrder, isLoading, error, resetState } = useDeleteOrder();
  const [on, toggle] = useToggle(false);

  const cancelHandler = useCallback(() => {
    resetState();
    toggle();
  }, [resetState, toggle]);

  const submitHandler = useCallback(async () => {
    const error = await deleteOrder(props.id, props.products);
    if (!error) {
      toggle();
    }
  }, [deleteOrder, props.id, props.products, toggle]);

  const label = 'キャンセル';

  return (
    <>
      <Button onClick={toggle} variant='outlined' color='error' startIcon={<Delete fontSize='small' />} size='small'>
        キャンセルする
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
