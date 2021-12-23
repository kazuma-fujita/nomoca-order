import { SubscriptionOrder } from 'API';
import { useCreateSubscriptionOrder } from 'hooks/subscription-orders/use-create-subscription-order';
import { useCallback, useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useNowDate } from 'stores/use-now-date';
import { CreateSubscriptionOrderDialog } from './create-subscription-order-dialog';
import { addYearWithSelectedMonth } from '../input-subscription-order-dialog';

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

export const CreateSubscriptionOrderDialogContainer = ({ on, toggle }: Props) => {
  const { now } = useNowDate();
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
  const formReturn = useForm<SubscriptionOrder>({ defaultValues: defaults });
  const { handleSubmit, reset: resetForm, control } = formReturn;
  const fieldArrayReturn = useFieldArray({ control, name: 'products.items' });
  const { fields, remove } = fieldArrayReturn;
  const { createSubscriptionOrder, isLoading, error, resetState } = useCreateSubscriptionOrder();

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
      async (data: SubscriptionOrder) => {
        try {
          await createSubscriptionOrder(data);
          cancelHandler();
        } catch (error) {}
      },
      [cancelHandler, createSubscriptionOrder],
    ),
  );

  return (
    <CreateSubscriptionOrderDialog
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
