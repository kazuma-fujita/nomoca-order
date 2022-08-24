import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Button from '@mui/material/Button';
import { DeliveryStatus, Order } from 'API';
import { ExtendedOrder } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { useCallback } from 'react';
import { useToggle } from 'react-use';
import { ExportSingleOrderCSVDialog } from './export-single-order-csv-dialog';

type Props = {
  selectedItems: ExtendedOrder<Order>[];
  setSelectedItems: React.Dispatch<React.SetStateAction<ExtendedOrder<Order>[]>>;
  exportSingleOrderCSVAndUpdateDeliveryStatus: (orders: ExtendedOrder<Order>[]) => Promise<void>;
  isLoading: boolean;
  resetState: () => void;
};

export const ExportSingleOrderCSVButton = ({
  selectedItems,
  setSelectedItems,
  exportSingleOrderCSVAndUpdateDeliveryStatus,
  isLoading,
  resetState,
}: Props) => {
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
  // 選択した注文の配送状況で発送前ステータス以外（発送済、キャンセル済）が一件でもあればボタン非活性
  const isDisabledButton =
    selectedItems.length === 0 ||
    selectedItems.filter((order) => order.deliveryStatus !== DeliveryStatus.ordered).length > 0;
  return (
    <>
      <Button
        onClick={toggle}
        variant='contained'
        color='info'
        startIcon={<FileDownloadIcon />}
        disabled={isDisabledButton}
      >
        選択した注文をCSV出力して顧客に発送通知をする
      </Button>
      <ExportSingleOrderCSVDialog
        on={on}
        isLoading={isLoading}
        isDisabledButton={isDisabledButton}
        submitHandler={submitHandler}
        cancelHandler={cancelHandler}
      />
    </>
  );
};
