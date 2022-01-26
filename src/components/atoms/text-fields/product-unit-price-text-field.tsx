import { TextField } from '@mui/material';
import { Product } from 'API';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

interface Props extends UseFormReturn<Product> {
  disabled: boolean;
  unitPrice?: number;
}

const minNumber = 1;
const maxLength = 256;

export const ProductUnitPriceTextField: React.FC<Props> = ({ formState, register, disabled, unitPrice }) => {
  return (
    <TextField
      required
      type='number'
      id='unitPrice'
      label='単価'
      autoComplete='off'
      margin='dense'
      fullWidth
      autoFocus
      disabled={disabled}
      defaultValue={unitPrice ?? 0}
      inputProps={{
        maxLength: maxLength,
      }}
      error={Boolean(formState.errors.unitPrice)}
      helperText={formState.errors.unitPrice && formState.errors.unitPrice.message}
      {...register('unitPrice', {
        required: '単価を入力してください',
        pattern: {
          value: /^[0-9]+$/i,
          message: '単価は半角数字で入力してください',
        },
        maxLength: { value: maxLength, message: `単価は${maxLength}桁以内で入力してください` },
        min: { value: minNumber, message: `単価は${minNumber}円以上で入力してください` },
      })}
    />
  );
};
