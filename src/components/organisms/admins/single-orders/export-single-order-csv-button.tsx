import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Button from '@mui/material/Button';
import { useUpdateSingleOrderStatus } from 'hooks/admins/single-orders/use-update-single-order-status';
import { useCallback } from 'react';
import { useToggle } from 'react-use';

type Props = {
  exportOrderIDs: string[];
};

export const ExportSingleOrderCSVButton = ({ exportOrderIDs }: Props) => {
  const { updateOrderStatus, isLoading, error, resetState } = useUpdateSingleOrderStatus();
  const [on, toggle] = useToggle(false);

  const cancelHandler = useCallback(() => {
    resetState();
    toggle();
  }, [resetState, toggle]);

  const submitHandler = useCallback(async () => {
    try {
      await updateOrderStatus(exportOrderIDs);
      cancelHandler();
    } catch (error) {}
  }, [updateOrderStatus, exportOrderIDs, cancelHandler]);

  return (
    <Button
      onClick={submitHandler}
      variant='contained'
      color='info'
      startIcon={<FileDownloadIcon />}
      disabled={exportOrderIDs.length === 0}
    >
      選択した注文をCSV出力する
    </Button>
  );
};
