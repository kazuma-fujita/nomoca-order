import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Button from '@mui/material/Button';
import { SubscriptionOrder } from 'API';
import { useUpdateSingleOrderStatus } from 'hooks/admins/single-orders/use-update-single-order-status';
import { useExportSubscriptionOrderCSV } from 'hooks/admins/subscription-orders/use-export-subscription-order-csv';
import { ExtendedOrder } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { useCallback } from 'react';
import { useToggle } from 'react-use';
import { ExportSubscriptionOrderCSVDialog } from './export-subscription-order-csv-dialog';

type props = {
  orders: ExtendedOrder<SubscriptionOrder>[] | null;
};

export const ExportSubscriptionOrderCSVButton = ({ orders }: props) => {
  const { exportCSV, isLoading, error, resetState } = useExportSubscriptionOrderCSV();
  const [on, toggle] = useToggle(false);

  const cancelHandler = useCallback(() => {
    resetState();
    toggle();
  }, [resetState, toggle]);

  const submitHandler = useCallback(async () => {
    try {
      await exportCSV(orders!);
      cancelHandler();
    } catch (error) {}
  }, [orders, exportCSV, cancelHandler]);

  return (
    <>
      <Button
        onClick={toggle}
        variant='contained'
        color='error'
        startIcon={<LocalShippingIcon />}
        // TODO: CSVの当月重複出力不可処理追加
        disabled={!orders || !orders.length}
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
