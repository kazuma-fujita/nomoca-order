import { TextField } from '@mui/material';
import { Product } from 'API';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

interface Props extends UseFormReturn<Product> {
  disabled: boolean;
  name?: string;
}

const maxLength = 256;

export const ProductNameTextField: React.FC<Props> = ({ formState, register, disabled, name }) => {
  return (
    <TextField
      required
      type='text'
      id='name'
      label='商品名'
      autoComplete='off'
      margin='dense'
      fullWidth
      autoFocus
      disabled={disabled}
      defaultValue={name ?? ''}
      inputProps={{
        maxLength: maxLength,
      }}
      error={Boolean(formState.errors.name)}
      helperText={formState.errors.name && formState.errors.name.message}
      {...register('name', {
        required: '商品名を入力してください',
        maxLength: { value: maxLength, message: `商品名は${maxLength}桁で入力してください` },
      })}
    />
  );
};
