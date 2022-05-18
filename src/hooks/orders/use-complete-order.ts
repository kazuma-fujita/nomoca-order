import { OrderType } from 'API';
import { Path } from 'constants/path';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useOrderFormParam } from 'stores/use-order-form-param';

export const useCompleteOrder = () => {
  const router = useRouter();
  const { data, mutate } = useOrderFormParam();
  const { orderType } = useOrderFormParam();
  const basePath = orderType === OrderType.singleOrder ? Path.singleOrder : Path.subscriptionOrder;
  if (!data) {
    router.push(basePath);
  }
  const onButtonClick = useCallback(() => {
    // It clears all global order form cache.
    mutate(undefined, false);
    router.push(basePath);
  }, [basePath, mutate, router]);

  return { onButtonClick };
};
