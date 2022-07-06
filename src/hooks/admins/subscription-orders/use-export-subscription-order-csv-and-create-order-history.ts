import { SubscriptionOrder } from 'API';
import { useExportOrderCSV } from 'hooks/admins/use-export-order-csv';
import { ExtendedOrder } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { useCallback, useState } from 'react';
import { parseResponseError } from 'utilities/parse-response-error';
import { useCreateSubscriptionOrderHistory } from './use-create-subscription-order-history';

export const useExportSubscriptionOrderCSVAndCreateOrderHistory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { exportCSV } = useExportOrderCSV();
  const { createOrderHistory } = useCreateSubscriptionOrderHistory();

  const exportSubscriptionOrderCSVAndCreateOrderHistory = async (orders: ExtendedOrder<SubscriptionOrder>[]) => {
    setIsLoading(true);
    try {
      await exportCSV(orders);
      await createOrderHistory(orders);
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

  return { exportSubscriptionOrderCSVAndCreateOrderHistory, isLoading, error, resetState };
};
