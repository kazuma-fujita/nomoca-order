import { Add } from '@mui/icons-material';
import { SubscriptionOrder } from 'API';
import { BaseSyntheticEvent } from 'react';
import { UseFieldArrayReturn, UseFormReturn } from 'react-hook-form';
import { InputSubscriptionOrderDialog } from '../input-subscription-order-dialog';

export type Props = {
  formReturn: UseFormReturn<SubscriptionOrder, object>;
  fieldArrayReturn: UseFieldArrayReturn<SubscriptionOrder, 'products.items', 'id'>;
  on: boolean;
  isLoading: boolean;
  error: Error | null;
  submitHandler: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  cancelHandler: () => void;
  now: Date;
};

export const CreateSubscriptionOrderDialog = ({
  formReturn,
  fieldArrayReturn,
  on,
  isLoading,
  error,
  submitHandler,
  cancelHandler,
  now,
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
      now={now}
    />
  );
};
