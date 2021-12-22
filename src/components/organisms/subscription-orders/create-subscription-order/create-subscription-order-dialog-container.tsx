import { SubscriptionOrder } from 'API';
import { useCreateSubscriptionOrder } from 'hooks/subscription-orders/use-create-subscription-order';
import { useCallback } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { CreateSubscriptionOrderDialog } from './create-subscription-order-dialog';

type Props = {
  on: boolean;
  toggle: (nextValue?: any) => void;
};

export const defaultValues = {
  products: { items: [{ productID: '', quantity: 1 }] },
  staffID: '',
};

export const CreateSubscriptionOrderDialogContainer = ({ on, toggle }: Props) => {
  const formReturn = useForm<SubscriptionOrder>({ defaultValues });
  const { handleSubmit, reset: resetForm, control } = formReturn;
  const fieldArrayReturn = useFieldArray({ control, name: 'products.items' });
  const { fields, remove } = fieldArrayReturn;
  const { createSubscriptionOrder, isLoading, error, resetState } = useCreateSubscriptionOrder();

  const cancelHandler = useCallback(() => {
    // 商品・数量の可変TextField初期化の為、全ての要素削除
    fields.map((_, index) => remove(index));
    // 入力フォームのデフォルト値を設定
    resetForm(defaultValues);
    resetState();
    toggle();
  }, [fields, resetForm, resetState, toggle, remove]);

  const submitHandler = handleSubmit(
    useCallback(
      async (data: SubscriptionOrder) => {
        // 関数内ではerrorの値がキャプチャされる為、ダイアログを閉じるエラーハンドリングは関数の戻り値を使用
        const error = await createSubscriptionOrder(data.products, data.staffID);
        if (!error) {
          cancelHandler();
        }
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
