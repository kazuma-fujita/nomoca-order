import { OrderType } from 'API';
import { Path } from 'constants/path';
import { SWRKey } from 'constants/swr-key';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useOrderFormParam } from 'stores/use-order-form-param';
import { useSWRConfig } from 'swr';
import { useFetchOrderList } from './use-fetch-order-list';

export const useCompleteOrder = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { swrKey: singleOrderSWRKey } = useFetchOrderList();
  const { orderType, mutate: orderFormMutate } = useOrderFormParam();
  const basePath = orderType === OrderType.singleOrder ? Path.singleOrder : Path.subscriptionOrder;

  // 一覧更新
  mutate(orderType === OrderType.singleOrder ? singleOrderSWRKey : SWRKey.subscriptionOrderList);

  const onButtonClick = useCallback(() => {
    // It clears all global order form cache.
    orderFormMutate(undefined, false);
    router.push(basePath);
  }, [basePath, orderFormMutate, router]);

  return { onButtonClick };
};
