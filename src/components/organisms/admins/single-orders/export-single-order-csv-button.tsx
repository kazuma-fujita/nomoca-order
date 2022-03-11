import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Button from '@mui/material/Button';
import { useUpdateSingleOrderStatus } from 'hooks/admins/single-orders/use-update-single-order-status';
import { useExportOrderCSV } from 'hooks/admins/use-export-order-csv';
import { useCallback } from 'react';
import { useToggle } from 'react-use';

type Props = {
  exportOrderIDs: string[];
};

export const ExportSingleOrderCSVButton = ({ exportOrderIDs }: Props) => {
  const { exportCSV, isLoading, error, resetState } = useExportOrderCSV();
  const [on, toggle] = useToggle(false);

  const cancelHandler = useCallback(() => {
    resetState();
    toggle();
  }, [resetState, toggle]);

  const submitHandler = useCallback(async () => {
    try {
      await exportCSV(exportOrderIDs);
      cancelHandler();
    } catch (error) {}
  }, [exportCSV, exportOrderIDs, cancelHandler]);

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
