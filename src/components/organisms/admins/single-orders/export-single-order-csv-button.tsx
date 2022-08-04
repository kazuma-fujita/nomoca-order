import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Button from '@mui/material/Button';
import { useCallback } from 'react';
import { useToggle } from 'react-use';
import { ExportSingleOrderCSVDialog } from './export-single-order-csv-dialog';
import { Order } from 'API';
import { useExportSingleOrderCSVAndUpdateDeliveryStatus } from 'hooks/admins/single-orders/use-export-single-order-csv-and-update-delivery-status';
import { ExtendedOrder } from 'hooks/subscription-orders/use-fetch-subscription-order-list';

type Props = {
  selectedItems: ExtendedOrder<Order>[];
  setSelectedItems: React.Dispatch<React.SetStateAction<ExtendedOrder<Order>[]>>;
};

export const ExportSingleOrderCSVButton = ({ selectedItems, setSelectedItems }: Props) => {
  const { exportSingleOrderCSVAndUpdateDeliveryStatus, isLoading, error, resetState } =
    useExportSingleOrderCSVAndUpdateDeliveryStatus();
  const [on, toggle] = useToggle(false);

  const cancelHandler = useCallback(() => {
    resetState();
    toggle();
  }, [resetState, toggle]);

  const submitHandler = useCallback(async () => {
    try {
      await exportSingleOrderCSVAndUpdateDeliveryStatus(selectedItems);
      // CSVを出力したらチェックボックス選択を全て解除
      setSelectedItems([]);
      cancelHandler();
    } catch (error) {}
  }, [exportSingleOrderCSVAndUpdateDeliveryStatus, selectedItems, setSelectedItems, cancelHandler]);

  return (
    <>
      <Button
        onClick={toggle}
        variant='contained'
        color='info'
        startIcon={<FileDownloadIcon />}
        disabled={selectedItems.length === 0}
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
