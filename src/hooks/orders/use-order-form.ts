import { Path } from 'constants/path';
import { FormScreenQuery } from 'constants/form-screen-query';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useFieldArray, UseFieldArrayReturn, useForm } from 'react-hook-form';
import { OrderFormParam, useOrderFormParam } from 'stores/use-order-form-param';
import { useProductList } from 'stores/use-product-list';
import { mergeOrderFormProductList } from 'functions/orders/merge-order-form-product-list';
import { OrderType } from 'API';

export const useOrderForm = () => {
  const router = useRouter();
  const { data, mutate, orderType } = useOrderFormParam();
  const { data: productList } = useProductList();
  const orderFormBasePath = orderType === OrderType.singleOrder ? Path.singleOrder : Path.subscriptionOrder;
  if (!data || !productList) {
    router.push(orderFormBasePath);
  }

  const formReturn = useForm<OrderFormParam>({ defaultValues: data! });
  const { handleSubmit, control } = formReturn;
  const fieldArrayReturn = useFieldArray({ control, name: 'products' });

  const cancelHandler = useCallback(() => {
    mutate(undefined, false);
    router.push(orderFormBasePath, undefined, { shallow: true });
  }, [mutate, router, orderFormBasePath]);

  const submitHandler = handleSubmit(
    useCallback(
      (data: OrderFormParam) => {
        // 入力された商品配列データをviewOrder順に並び替え、重複商品はquantityを合計してmergeし重複削除
        const mergedProducts = mergeOrderFormProductList(data.products!, productList!);
        mutate({ ...data, products: mergedProducts }, false);
        router.push(`${orderFormBasePath}?${FormScreenQuery.confirm}`, undefined, { shallow: true });
      },
      [productList, mutate, router, orderFormBasePath],
    ),
  );

  return { formReturn, fieldArrayReturn, submitHandler, cancelHandler };
};
