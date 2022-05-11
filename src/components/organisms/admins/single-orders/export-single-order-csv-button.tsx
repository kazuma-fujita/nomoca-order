import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Button from '@mui/material/Button';
import { Order } from 'API';
import { useExportSingleOrderCSVAndUpdateDeliveryStatus } from 'hooks/admins/single-orders/use-export-single-order-csv-and-update-delivery-status';
import { useExportOrderCSV } from 'hooks/admins/use-export-order-csv';
import { ExtendedOrder } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { useCallback } from 'react';
import { useToggle } from 'react-use';
import { ExportSingleOrderCSVDialog } from './export-single-order-csv-dialog';

type Props = {
  orders: ExtendedOrder<Order>[];
};

export const ExportSingleOrderCSVButton = ({ orders }: Props) => {
  const { exportSingleOrderCSVAndUpdateDeliveryStatus, isLoading, error, resetState } =
    useExportSingleOrderCSVAndUpdateDeliveryStatus();
  const [on, toggle] = useToggle(false);

  const cancelHandler = useCallback(() => {
    resetState();
    toggle();
  }, [resetState, toggle]);

  const submitHandler = useCallback(async () => {
    try {
      await exportSingleOrderCSVAndUpdateDeliveryStatus(orders);
      cancelHandler();
    } catch (error) {}
  }, [exportSingleOrderCSVAndUpdateDeliveryStatus, orders, cancelHandler]);

  return (
    <>
      <Button
        onClick={toggle}
        variant='contained'
        color='info'
        startIcon={<FileDownloadIcon />}
        disabled={orders.length === 0}
      >
        選択した注文をCSV出力して顧客に発送通知をする
      </Button>
      <ExportSingleOrderCSVDialog
        on={on}
        isLoading={isLoading}
        error={error}
        submitHandler={submitHandler}
        cancelHandler={cancelHandler}
      />
    </>
  );
};
