import { Add } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { SubscriptionOrder } from 'API';
import { useCreateSubscriptionOrder } from 'hooks/subscription-orders/use-create-subscription-order';
import { useCallback } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useToggle } from 'react-use';
import { useStaffList } from 'stores/use-staff-list';
import { useProductList } from 'stores/use-product-list';
import { InputSubscriptionOrderDialog } from './input-subscription-order-dialog';
import { SubscriptionOrderProduct } from 'API';

const defaultValues = {
  products: { items: [{ productID: '' }] },
  staffID: '',
};

export const CreateSubscriptionOrderButton = () => {
  // const useFormReturn = useForm<SubscriptionOrder>({ defaultValues });
  const useFormReturn = useForm<SubscriptionOrder>({ defaultValues });
  const { handleSubmit, control, reset: resetForm } = useFormReturn;
  const useFieldArrayReturn = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'products.items',
    // keyName: 'productID', // default to "id", you can change the key name
  });
  const { createSubscriptionOrder, isLoading, error, resetState } = useCreateSubscriptionOrder();
  const { data: productList } = useProductList();
  const { data: staffList } = useStaffList();
  const [on, toggle] = useToggle(false);

  const submitHandler = handleSubmit(
    useCallback(async (data: SubscriptionOrder) => {
      console.log('submit handler data:', data);
      if (data.products && data.products.items) {
        const productIDs = data.products.items as SubscriptionOrderProduct[];
        await createSubscriptionOrder(productIDs, data.staffID);
      }
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
