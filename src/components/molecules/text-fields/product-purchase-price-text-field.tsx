import { TextField } from '@mui/material';
import { Product } from 'API';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

interface Props extends UseFormReturn<Product> {
  disabled: boolean;
}

const minNumber = 1;
const maxLength = 256;

export const ProductPurchasePriceTextField: React.FC<Props> = ({ formState, register, disabled }) => {
  return (
    <TextField
      required
      type='number'
      id='purchase'
      label='仕入れ値'
      autoComplete='off'
      margin='dense'
      fullWidth
      disabled={disabled}
      inputProps={{
        maxLength: maxLength,
      }}
      error={Boolean(formState.errors.purchasePrice)}
      helperText={formState.errors.purchasePrice && formState.errors.purchasePrice.message}
      {...register('purchasePrice', {
        required: '仕入れ値を入力してください',
        pattern: {
          value: /^[0-9]+$/i,
          message: '仕入れ値は半角数字で入力してください',
        },
        maxLength: { value: maxLength, message: `仕入れ値は${maxLength}桁以内で入力してください` },
        min: { value: minNumber, message: `仕入れ値は${minNumber}円以上で入力してください` },
        valueAsNumber: true,
      })}
    />
  );
};
