import { Add } from '@mui/icons-material';
import { Order } from 'API';
import { BaseSyntheticEvent } from 'react';
import { UseFieldArrayReturn, UseFormReturn } from 'react-hook-form';

export type Props = {
  formReturn: UseFormReturn<Order, object>;
  fieldArrayReturn: UseFieldArrayReturn<Order, 'products.items', 'id'>;
  on: boolean;
  isLoading: boolean;
  error: Error | null;
  submitHandler: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  cancelHandler: () => void;
};

export const CreateSingleOrderDialog = ({
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
    <></>
    // <InputSingleOrderDialog
    //   label={label}
    //   startIcon={<Add />}
    //   on={on}
    //   isLoading={isLoading}
    //   error={error}
    //   submitHandler={submitHandler}
    //   cancelHandler={cancelHandler}
    //   formReturn={formReturn}
    //   fieldArrayReturn={fieldArrayReturn}
    // />
  );
};
