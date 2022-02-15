import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Button from '@mui/material/Button';
import { useUpdateSingleOrderStatus } from 'hooks/admins/single-orders/use-update-single-order-status';
import { useCallback } from 'react';
import { useToggle } from 'react-use';
import { UpdateSingleOrderStatusDialog } from './update-single-order-status-dialog';

type Props = {
  updateOrderIDs: string[];
};

export const UpdateSingleOrderStatusButton = ({ updateOrderIDs }: Props) => {
  const { updateOrderStatus, isLoading, error, resetState } = useUpdateSingleOrderStatus();
  const [on, toggle] = useToggle(false);

  const cancelHandler = useCallback(() => {
    resetState();
    toggle();
  }, [resetState, toggle]);

  const submitHandler = useCallback(async () => {
    try {
      await updateOrderStatus(updateOrderIDs);
      cancelHandler();
    } catch (error) {}
  }, [updateOrderStatus, updateOrderIDs, cancelHandler]);

  return (
    <>
      <Button
        onClick={toggle}
        variant='contained'
        color='error'
        startIcon={<LocalShippingIcon />}
        disabled={updateOrderIDs.length === 0}
      >
        選択した注文を発送済みにする
      </Button>
      <UpdateSingleOrderStatusDialog
        on={on}
        isLoading={isLoading}
        error={error}
        submitHandler={submitHandler}
        cancelHandler={cancelHandler}
      />
    </>
  );
};
