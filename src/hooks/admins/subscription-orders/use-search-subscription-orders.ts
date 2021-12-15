import { SubscriptionOrder } from 'API';
import { SWRKey } from 'constants/swr-key';
import { useCallback, useState } from 'react';
import { useSWRConfig } from 'swr';
import { isFilterWithDeliveryMonth } from './is-filter-with-delivery-month';

export const useSearchSubscriptionOrders = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();
  // mutateはstoreで保持しているdataをasyncで取得、加工後のdataをPromiseで返却しstoreのstateを更新する
  // この検索ロジックでは、保存用の全件dataを取得し、加工用データとしてcopyを作成。
  // 加工後データは画面表示用stateに保存。保存用の全件dataはそのままreturnしてstateは変更しない。
  const onSearch =
    (deliveryMonth: number, deliveryInterval: number) =>
    async (data: SubscriptionOrder[]): Promise<SubscriptionOrder[]> => {
      setIsLoading(true);
      // 全件dataを配達月でフィルタリング
      const copy = data.filter((item) =>
        isFilterWithDeliveryMonth(deliveryMonth, item.deliveryStartMonth, deliveryInterval),
      );
      setIsLoading(false);
      // 加工後データで画面表示用stateを更新。
      mutate(SWRKey.AdminSubscriptionOrderList, copy, false);
      // 保存用全件dataはそのままreturn
      return data;
    };

  // mutateを実行し保存用全件dataを取得
  const search = async (deliveryMonth: number) =>
    mutate(SWRKey.AdminAllSubscriptionOrderList, onSearch(deliveryMonth, 3), false);

  const resetState = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  return { search, isLoading, error, resetState };
};
