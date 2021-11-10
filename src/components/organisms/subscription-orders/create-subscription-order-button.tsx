import { Add } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { SubscriptionOrder } from 'API';
import { useCreateSubscriptionOrder } from 'hooks/subscription-orders/use-create-subscription-order';
import { useCallback } from 'react';
import { useFieldArray, useForm, Resolver } from 'react-hook-form';
import { useToggle } from 'react-use';
import { useStaffList } from 'stores/use-staff-list';
import { useProductList } from 'stores/use-product-list';
import { InputSubscriptionOrderDialog } from './input-subscription-order-dialog';

const defaultValues = {
  products: { items: [{ productID: '' }] },
  staffID: '',
};

export const CreateSubscriptionOrderButton = () => {
  const useFormReturn = useForm<SubscriptionOrder>({ defaultValues });
  const { handleSubmit, reset: resetForm, control } = useFormReturn;
  const useFieldArrayReturn = useFieldArray({ control, name: 'products.items' });
  const { createSubscriptionOrder, isLoading, error, resetState } = useCreateSubscriptionOrder();
  const { data: productList } = useProductList();
  const { data: staffList } = useStaffList();
  const [on, toggle] = useToggle(false);

  const submitHandler = handleSubmit(
    useCallback(async (data: SubscriptionOrder) => {
      console.log('submit handler data:', data);
      // 関数内ではerrorの値がキャプチャされる為、ダイアログを閉じるエラーハンドリングは以下関数の戻り値を使用
      const error = await createSubscriptionOrder(data.products, data.staffID);
      if (!error) {
        cancelHandler();
      }
    }, [])
  );

  const cancelHandler = useCallback(() => {
    // resetForm({ staffID: '' });
    resetForm(defaultValues);
    resetState();
    toggle();
  }, []);

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
        productList={productList}
        staffList={staffList}
      />
    </>
  );
};
