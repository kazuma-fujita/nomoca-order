import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Path } from 'constants/path';
import { FormScreenQuery } from 'constants/form-screen-query';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useFieldArray, UseFieldArrayReturn, useForm } from 'react-hook-form';
import { OrderFormParam, useOrderFormParam } from 'stores/use-order-form-param';
import { InputSingleOrder } from './input-single-order';
import { useProductList } from 'stores/use-product-list';
import { mergeOrderFormProductList } from 'functions/orders/merge-order-form-product-list';

export const InputSingleOrderContainer = () => {
  const router = useRouter();
  const { data, mutate } = useOrderFormParam();
  const { data: productList } = useProductList();
  if (!data || !productList) {
    router.push(Path.singleOrder);
  }
  const formReturn = useForm<OrderFormParam>({ defaultValues: data! });
  const { handleSubmit, control } = formReturn;
  const fieldArrayReturn = useFieldArray({ control, name: 'products' });

  const cancelHandler = useCallback(() => {
    mutate(undefined, false);
    router.push(Path.singleOrder, undefined, { shallow: true });
  }, [router, mutate]);

  const submitHandler = handleSubmit(
    useCallback(
      (data: OrderFormParam) => {
        const mergedProducts = mergeOrderFormProductList(data.products!, productList!);
        mutate({ ...data, products: mergedProducts }, false);
        router.push(`${Path.singleOrder}?${FormScreenQuery.confirm}`, undefined, { shallow: true });
      },
      [productList, mutate, router],
    ),
  );

  return (
    <InputSingleOrder
      formReturn={formReturn}
      fieldArrayReturn={fieldArrayReturn as UseFieldArrayReturn}
      submitHandler={submitHandler}
      cancelHandler={cancelHandler}
      startIcon={<ArrowForwardIosIcon />}
      initialReceiptProducts={data!.products}
    />
  );
};
