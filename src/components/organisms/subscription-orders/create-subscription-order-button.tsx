import { Add } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { SubscriptionOrder } from 'API';
import { useCreateSubscriptionOrder } from 'hooks/subscription-orders/use-create-subscription-order';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useToggle } from 'react-use';
import { InputSubscriptionOrderDialog } from './input-subscription-order-dialog';

export const CreateSubscriptionOrderButton = () => {
  // const { handleSubmit, watch, register, formState } = useForm<SubscriptionOrder>();
  const useFormReturn = useForm<SubscriptionOrder>({ defaultValues: {} });
  const { handleSubmit, reset: resetForm } = useFormReturn;
  const { createSubscriptionOrder, isLoading, error, resetState } = useCreateSubscriptionOrder();
  const [on, toggle] = useToggle(false);
  const submitHandler = handleSubmit(
    useCallback(async (data: SubscriptionOrder) => {
      await createSubscriptionOrder();
      if (!error) {
        resetForm();
        toggle();
      }
    }, [])
  );
  const cancelHandler = useCallback(() => {
    resetForm();
    resetState();
    toggle();
  }, []);
  const label = '申し込み';
  return (
    <>
      <Button onClick={toggle} variant='outlined' startIcon={<Add />}>
        定期便を{label}する
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
      />
    </>
  );
};
