import { Order } from 'API';
import { useCreateOrder } from 'hooks/orders/use-create-order';
import { useCallback, useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useNowDate } from 'stores/use-now-date';
import { CreateSingleOrderDialog } from './create-single-order-dialog';
import { addYearWithSelectedMonth } from '../input-single-order-dialog';

type Props = {
  on: boolean;
  toggle: (nextValue?: any) => void;
};

export const defaultValues = {
  products: { items: [{ productID: '', quantity: 1 }] },
  staffID: '',
  deliveryStartMonth: 0,
  deliveryStartYear: 0,
  deliveryInterval: 1,
};

export const CreateSingleOrderDialogContainer = ({ on, toggle }: Props) => {
  // const { now } = useNowDate();
  const now = new Date(2021, 0, 1);
  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth() + 1;
  const nextMonth = nowMonth + 1 === 13 ? 1 : nowMonth + 1;
  const defaults = useMemo(
    () => ({
      ...defaultValues,
      deliveryStartYear: addYearWithSelectedMonth(nowYear, nowMonth, nextMonth),
      deliveryStartMonth: nextMonth,
    }),
    [nextMonth, nowMonth, nowYear],
  );
  const formReturn = useForm<Order>({ defaultValues: defaults });
  const { handleSubmit, reset: resetForm, control } = formReturn;
  const fieldArrayReturn = useFieldArray({ control, name: 'products.items' });
  const { fields, remove } = fieldArrayReturn;
  const { createOrder, isLoading, error, resetState } = useCreateOrder();

  const cancelHandler = useCallback(() => {
    // 商品・数量の可変TextField初期化の為、全ての要素削除
    fields.map((_, index) => remove(index));
    // 入力フォームのデフォルト値を設定
    resetForm(defaults);
    resetState();
    toggle();
  }, [fields, resetForm, defaults, resetState, toggle, remove]);

  const submitHandler = handleSubmit(
    useCallback(
      async (data: Order) => {
        try {
          await createOrder(data);
          cancelHandler();
        } catch (error) {}
      },
      [cancelHandler, createOrder],
    ),
  );

  return (
    <CreateSingleOrderDialog
      formReturn={formReturn}
      fieldArrayReturn={fieldArrayReturn}
      on={on}
      isLoading={isLoading}
      error={error}
      submitHandler={submitHandler}
      cancelHandler={cancelHandler}
    />
  );
};
