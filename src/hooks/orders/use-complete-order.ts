import { OrderType } from 'API';
import { Path } from 'constants/path';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useOrderFormParam } from 'stores/use-order-form-param';

export const useCompleteOrder = () => {
  const router = useRouter();
  const { orderType, mutate: orderFormMutate } = useOrderFormParam();
  const basePath = orderType === OrderType.singleOrder ? Path.singleOrder : Path.subscriptionOrder;

  const onButtonClick = useCallback(() => {
    // It clears all global order form cache.
    orderFormMutate(undefined, false);
    router.push(basePath);
  }, [basePath, orderFormMutate, router]);

  return { onButtonClick };
};
