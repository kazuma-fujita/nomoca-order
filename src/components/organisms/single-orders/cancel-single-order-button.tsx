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
  disabled: boolean;
};

export const CancelSingleOrderButton = ({ id, products, disabled }: Props) => {
  const { deleteOrder, isLoading, error, resetState } = useDeleteOrder();
  const [on, toggle] = useToggle(false);

  const cancelHandler = useCallback(() => {
    resetState();
    toggle();
  }, [resetState, toggle]);

  const submitHandler = useCallback(async () => {
    const error = await deleteOrder(id, products);
    if (!error) {
      toggle();
    }
  }, [deleteOrder, id, products, toggle]);

  const label = 'キャンセル';

  return (
    <>
      <Button
        onClick={toggle}
        variant='outlined'
        color='error'
        startIcon={<Delete fontSize='small' />}
        size='small'
        disabled={disabled}
      >
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
