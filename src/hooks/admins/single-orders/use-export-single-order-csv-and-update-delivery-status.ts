import { Order } from 'API';
import { useExportOrderCSV } from 'hooks/admins/use-export-order-csv';
import { ExtendedOrder } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { useCallback, useState } from 'react';
import { useNowDate } from 'stores/use-now-date';
import { parseResponseError } from 'utilities/parse-response-error';
import { useUpdateSingleOrderDeliveryStatus } from './use-update-single-order-delivery-status';

export const useExportSingleOrderCSVAndUpdateDeliveryStatus = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { exportCSV } = useExportOrderCSV();
  const { updateOrderDeliveryStatus } = useUpdateSingleOrderDeliveryStatus();

  const exportSingleOrderCSVAndUpdateDeliveryStatus = async (orders: ExtendedOrder<Order>[]) => {
    setIsLoading(true);
    try {
      await exportCSV(orders);
      await updateOrderDeliveryStatus(orders);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      const parsedError = parseResponseError(error);
      setError(parsedError);
      throw parsedError;
    }
  };

  const resetState = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  return { exportSingleOrderCSVAndUpdateDeliveryStatus, isLoading, error, resetState };
};
