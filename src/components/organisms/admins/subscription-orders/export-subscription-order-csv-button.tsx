import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Button from '@mui/material/Button';
import { useUpdateSingleOrderStatus } from 'hooks/admins/single-orders/use-update-single-order-status';
import { useCallback } from 'react';
import { useToggle } from 'react-use';
import { ExportSubscriptionOrderCSVDialog } from './export-subscription-order-csv-dialog';

type Props = {
  updateOrderIDs: string[];
};

export const ExportSubscriptionOrderCSVButton = ({ updateOrderIDs }: Props) => {
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
        // TODO: CSVの当月重複出力不可処理追加
        // disabled={updateOrderIDs.length === 0}
      >
        当月発送定期便をCSV出力して顧客に発送通知をする
      </Button>
      <ExportSubscriptionOrderCSVDialog
        on={on}
        isLoading={isLoading}
        error={error}
        submitHandler={submitHandler}
        cancelHandler={cancelHandler}
      />
    </>
  );
};
