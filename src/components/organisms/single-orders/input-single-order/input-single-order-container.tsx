import { Add } from '@mui/icons-material';
import { Order } from 'API';
import { useCreateOrder } from 'hooks/orders/use-create-order';
import { useCallback, useMemo } from 'react';
import { useFieldArray, useForm, UseFieldArrayReturn } from 'react-hook-form';
import { useNowDate } from 'stores/use-now-date';
import { InputSingleOrder } from './input-single-order';
import { addYearWithSelectedMonth } from './input-single-order';
import { useOrderFormParam, OrderFormParam } from 'stores/use-order-form-param';
import { useRouter } from 'next/router';

export const InputSingleOrderContainer = () => {
  const router = useRouter();
  const { data, mutate } = useOrderFormParam();
  // const defaults = data ?? defaultValues;
  // TODO: will change data is non-nullable
  if (!data) {
    router.push('/single-order', undefined, { shallow: true });
  }
  const formReturn = useForm<OrderFormParam>({ defaultValues: data! });
  const { handleSubmit, reset: resetForm, control } = formReturn;
  const fieldArrayReturn = useFieldArray({ control, name: 'products' });
  // const { fields, remove } = fieldArrayReturn;
  const { createOrder, isLoading, error, resetState } = useCreateOrder();

  const cancelHandler = useCallback(() => {
    // 商品・数量の可変TextField初期化の為、全ての要素削除
    // fields.map((_, index) => remove(index));
    // 入力フォームのデフォルト値を設定
    // resetForm(defaults);
    // resetState();
    router.push('/single-order', undefined, { shallow: true });
    // It clears all form param in global state using a SWR mutate.
    mutate(undefined, false);
    // }, [fields, resetForm, defaults, resetState, remove]);
  }, [router, mutate]);

  const submitHandler = handleSubmit(
    useCallback(
      async (data: OrderFormParam) => {
        try {
          await createOrder(data);
          cancelHandler();
        } catch (error) {}
      },
      [cancelHandler, createOrder],
    ),
  );

  return (
    <InputSingleOrder
      formReturn={formReturn}
      fieldArrayReturn={fieldArrayReturn as UseFieldArrayReturn}
      isLoading={isLoading}
      error={error}
      submitHandler={submitHandler}
      cancelHandler={cancelHandler}
      startIcon={<Add />}
    />
  );
};
