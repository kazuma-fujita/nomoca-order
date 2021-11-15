import { Add } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { SubscriptionOrder } from 'API';
import { useCreateSubscriptionOrder } from 'hooks/subscription-orders/use-create-subscription-order';
import { useCallback, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useToggle } from 'react-use';
import { InputSubscriptionOrderDialog } from './input-subscription-order-dialog';

const defaultValues = {
  products: { items: [{ productID: '', quantity: 1 }] },
  staffID: '',
};

export const CreateSubscriptionOrderButton = () => {
  const useFormReturn = useForm<SubscriptionOrder>({ defaultValues });
  const { handleSubmit, reset: resetForm, control } = useFormReturn;
  const useFieldArrayReturn = useFieldArray({ control, name: 'products.items' });
  const { fields, remove } = useFieldArrayReturn;
  const { createSubscriptionOrder, isLoading, error, resetState } = useCreateSubscriptionOrder();
  const [on, toggle] = useToggle(false);

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
        console.log('submit handler data:', data);
        // 関数内ではerrorの値がキャプチャされる為、ダイアログを閉じるエラーハンドリングは関数の戻り値を使用
        const error = await createSubscriptionOrder(data.products, data.staffID);
        if (!error) {
          cancelHandler();
        }
      },
      [cancelHandler, createSubscriptionOrder],
    ),
  );

  const label = '申し込む';

  return (
    <>
      <Button onClick={toggle} variant='outlined' startIcon={<Add />}>
        定期便を{label}
      </Button>
      <InputSubscriptionOrderDialog
        label={label}
        startIcon={<Add />}
        on={on}
        isLoading={isLoading}
        error={error}
        submitHandler={submitHandler}
        cancelHandler={cancelHandler}
        useFormReturn={useFormReturn}
        useFieldArrayReturn={useFieldArrayReturn}
      />
    </>
  );
};
