import { Add } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { SubscriptionOrder } from 'API';
import { useCreateSubscriptionOrder } from 'hooks/subscription-orders/use-create-subscription-order';
import { useCallback, useEffect, BaseSyntheticEvent } from 'react';
import { useFieldArray, useForm, UseFormReturn, UseFieldArrayReturn } from 'react-hook-form';
import { useToggle } from 'react-use';
import { InputSubscriptionOrderDialog } from '../input-subscription-order-dialog';

export type Props = {
  formReturn: UseFormReturn<SubscriptionOrder, object>;
  fieldArrayReturn: UseFieldArrayReturn<SubscriptionOrder, 'products.items', 'id'>;
  on: boolean;
  isLoading: boolean;
  error: Error | null;
  submitHandler: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  cancelHandler: () => void;
};

export const CreateSubscriptionOrderDialog = ({
  formReturn,
  fieldArrayReturn,
  on,
  isLoading,
  error,
  submitHandler,
  cancelHandler,
}: Props) => {
  const label = '申し込む';

  return (
    <InputSubscriptionOrderDialog
      label={label}
      startIcon={<Add />}
      on={on}
      isLoading={isLoading}
      error={error}
      submitHandler={submitHandler}
      cancelHandler={cancelHandler}
      useFormReturn={formReturn}
      useFieldArrayReturn={fieldArrayReturn}
    />
  );
};
