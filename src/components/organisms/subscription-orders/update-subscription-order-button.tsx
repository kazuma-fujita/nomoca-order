import { Edit } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { SubscriptionOrder } from 'API';
import { useUpdateSubscriptionOrder } from 'hooks/subscription-orders/use-update-subscription-order';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useToggle } from 'react-use';
import { InputSubscriptionOrderDialog } from './input-subscription-order-dialog';

type Props = {
  id: string;
};

export const UpdateSubscriptionOrderButton = (props: Props) => {
  // const { handleSubmit, watch, register, formState } = useForm<SubscriptionOrder>();
  const useFormReturn = useForm<SubscriptionOrder>({ defaultValues: {} });
  const { handleSubmit, reset: resetForm } = useFormReturn;
  const { updateSubscriptionOrder, isLoading, error, resetState } = useUpdateSubscriptionOrder();
  const [on, toggle] = useToggle(false);
  const submitHandler = handleSubmit(
    useCallback(async (data: SubscriptionOrder) => {
      await updateSubscriptionOrder(props.id);
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
      />
    </>
  );
};
