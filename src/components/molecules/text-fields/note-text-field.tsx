import { TextField } from '@mui/material';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { OrderFormParam } from 'stores/use-order-form-param';

type Props = UseFormReturn<OrderFormParam> & {
  disabled: boolean;
};

export const NoteTextField = ({ formState, register, setValue, disabled }: Props) => {
  // TextFieldからフォーカスが外れたら入力値のtrim処理
  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue('note', event.target.value.trim());
  };

  return (
    <TextField
      type='text'
      id='note'
      label='備考'
      autoComplete='off'
      fullWidth
      multiline
      rows={8}
      // sx={{ width: 300 }}
      disabled={disabled}
      error={Boolean(formState.errors.note)}
      helperText={formState.errors.note && formState.errors.note.message}
      {...register('note', {
        onBlur: handleBlur,
      })}
    />
  );
};
