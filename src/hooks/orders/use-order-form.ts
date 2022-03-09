import { OrderType } from 'API';
import { FormScreenQuery } from 'constants/form-screen-query';
import { Path } from 'constants/path';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { OrderFormParam, useOrderFormParam } from 'stores/use-order-form-param';
import { useProductList } from 'stores/use-product-list';

const defaultValues: OrderFormParam = {
  products: [{ relationID: '', productID: '', name: '', unitPrice: 0, quantity: 1 }],
  staffID: '',
};

export const useCreateOrderButton = () => {
  const router = useRouter();
  const { mutate, orderType } = useOrderFormParam();
  const basePath = orderType === OrderType.singleOrder ? Path.singleOrder : Path.subscriptionOrder;
  const buttonLabel = orderType === OrderType.singleOrder ? '商品を注文する' : '定期便を申し込む';

  const onButtonClick = useCallback(() => {
    // It initializes all global cache data.
    mutate(defaultValues, false);
    router.push(`${basePath}?${FormScreenQuery.input}`, undefined, { shallow: true });
  }, [basePath, mutate, router]);
  return { buttonLabel, onButtonClick };
};

export const useOrderForm = () => {
  const router = useRouter();
  const { data, mutate, orderType } = useOrderFormParam();
  const { data: productList } = useProductList();
  const basePath = orderType === OrderType.singleOrder ? Path.singleOrder : Path.subscriptionOrder;
  if (!data || !productList) {
    router.push(basePath);
  }

  const formReturn = useForm<OrderFormParam>({ defaultValues: data! });
  const { handleSubmit, control } = formReturn;
  const fieldArrayReturn = useFieldArray({ control, name: 'products' });

  const cancelHandler = useCallback(() => {
    mutate(undefined, false);
    router.push(basePath, undefined, { shallow: true });
  }, [mutate, router, basePath]);

  const submitHandler = handleSubmit(
    useCallback(
      (data: OrderFormParam) => {
        // 入力された商品配列データをviewOrder順に並び替え、重複商品はquantityを合計してmergeし重複削除
        // const mergedProducts = mergeOrderFormProductList(data.products!, productList!);
        // mutate({ ...data, products: mergedProducts }, false);
        mutate(data, false);
        router.push(`${basePath}?${FormScreenQuery.confirm}`, undefined, { shallow: true });
      },
      // [productList, mutate, router, basePath],
      [mutate, router, basePath],
    ),
  );

  return { formReturn, fieldArrayReturn, submitHandler, cancelHandler };
};
