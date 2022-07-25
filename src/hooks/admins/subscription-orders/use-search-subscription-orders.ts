import { SubscriptionOrder } from 'API';
import { SWRKey } from 'constants/swr-key';
// import { useFetchSubscriptionOrderList } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { useCallback, useState } from 'react';
import { useSWRConfig } from 'swr';
import { isFilterWithDeliveryMonth, maxMonth, minMonth } from 'functions/delivery-dates/is-filter-with-delivery-month';

export const useSearchSubscriptionOrders = () => {
  // const { data } = useFetchSubscriptionOrderList();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();
  // この検索ロジックでは保存用の全件dataをcontextから取得、データ加工し画面表示用stateを更新。
  const onSearch =
    (searchDeliveryYear: number, searchDeliveryMonth: number, nowYear: number, nowMonth: number) =>
    async (data: SubscriptionOrder[]): Promise<SubscriptionOrder[]> => {
      setIsLoading(true);

      if (!data) {
        setIsLoading(false);
        setError(Error('All list data did not find.'));
        throw error;
      }
      // searchDeliveryMonth=0は全件検索の為、dataを返却
      if (searchDeliveryMonth === 0) {
        setIsLoading(false);
        setError(null);
        return data;
      }
      if (searchDeliveryMonth < minMonth || maxMonth < searchDeliveryMonth) {
        setIsLoading(false);
        setError(Error('The input values are out of range.'));
        throw error;
      }
      // 全件dataを配送月でフィルタリング
      const filteredData = data.filter((item) =>
        isFilterWithDeliveryMonth(
          searchDeliveryYear,
          searchDeliveryMonth,
          item.deliveryStartYear,
          item.deliveryStartMonth,
          item.deliveryInterval,
          nowYear,
          nowMonth,
        ),
      );
      setIsLoading(false);
      setError(null);
      // 加工後データで画面表示用stateを更新。
      return filteredData;
    };

  const search = async (searchDeliveryYear: number, searchDeliveryMonth: number, nowYear: number, nowMonth: number) =>
    mutate(
      SWRKey.AdminSubscriptionOrderList,
      onSearch(searchDeliveryYear, searchDeliveryMonth, nowYear, nowMonth),
      false,
    );

  const resetState = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  return { search, isLoading, error, resetState };
};
