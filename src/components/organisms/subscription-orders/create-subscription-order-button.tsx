import { Add } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { SubscriptionOrder } from 'API';
import { useCreateSubscriptionOrder } from 'hooks/subscription-orders/use-create-subscription-order';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useToggle } from 'react-use';
import { useStaffList } from 'stores/use-staff-list';
import { InputSubscriptionOrderDialog } from './input-subscription-order-dialog';

export const CreateSubscriptionOrderButton = () => {
  const useFormReturn = useForm<SubscriptionOrder>();
  const { handleSubmit, reset: resetForm } = useFormReturn;
  const { createSubscriptionOrder, isLoading, error, resetState } = useCreateSubscriptionOrder();
  const { data: staffList } = useStaffList();
  const [on, toggle] = useToggle(false);
  const submitHandler = handleSubmit(
    useCallback(async (data: SubscriptionOrder) => {
      await createSubscriptionOrder(data.staffID);
      if (!error) {
        cancelHandler();
      }
    }, [])
  );
  const cancelHandler = useCallback(() => {
    resetForm({ staffID: '' });
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
        staffList={staffList}
      />
    </>
  );
};
