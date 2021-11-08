import { Edit } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { SubscriptionOrder } from 'API';
import { useUpdateSubscriptionOrder } from 'hooks/subscription-orders/use-update-subscription-order';
import { useCallback, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useToggle } from 'react-use';
import { useProductList } from 'stores/use-product-list';
import { useStaffList } from 'stores/use-staff-list';
import { InputSubscriptionOrderDialog } from './input-subscription-order-dialog';

type Props = {
  id: string;
  staffID: string;
};

export const UpdateSubscriptionOrderButton = (props: Props) => {
  const useFormReturn = useForm<SubscriptionOrder>();
  const { handleSubmit, reset: resetForm, clearErrors, control } = useFormReturn;
  const useFieldArrayReturn = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'products.items',
  });
  const { data: productList } = useProductList();
  const { data: staffList } = useStaffList();
  const { updateSubscriptionOrder, isLoading, error, resetState } = useUpdateSubscriptionOrder();
  const [on, toggle] = useToggle(false);
  useEffect(() => {
    resetForm({ staffID: props.staffID });
  }, []);
  const submitHandler = handleSubmit(
    useCallback(async (data: SubscriptionOrder) => {
      await updateSubscriptionOrder(props.id, data.staffID);
      if (!error) {
        cancelHandler();
        // resetForm();
        // clearErrors();
        // toggle();
      }
    }, [])
  );
  const cancelHandler = useCallback(() => {
    resetState();
    toggle();
  }, []);
  const label = '編集する';
  return (
    <>
      <Button onClick={toggle} variant='outlined' startIcon={<Edit fontSize='small' />}>
        {label}
      </Button>
      <InputSubscriptionOrderDialog
        label={label}
        startIcon={<Edit />}
        on={on}
        isLoading={isLoading}
        error={error}
        submitHandler={submitHandler}
        cancelHandler={cancelHandler}
        useFormReturn={useFormReturn}
        useFieldArrayReturn={useFieldArrayReturn}
        productList={productList}
        staffList={staffList}
        staffID={props.staffID}
      />
    </>
  );
};
