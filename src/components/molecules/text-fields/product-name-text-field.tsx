import { TextField } from '@mui/material';
import { Product } from 'API';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

interface Props extends UseFormReturn<Product> {
  disabled: boolean;
}

const maxLength = 256;

export const ProductNameTextField: React.FC<Props> = ({ formState, register, setValue, disabled }) => {
  // TextFieldからフォーカスが外れたらtrim処理
  const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue('name', event.target.value.trim());
  };

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
      inputProps={{
        maxLength: maxLength,
      }}
      error={Boolean(formState.errors.name)}
      helperText={formState.errors.name && formState.errors.name.message}
      {...register('name', {
        required: '商品名を入力してください',
        maxLength: { value: maxLength, message: `商品名は${maxLength}桁で入力してください` },
        pattern: {
          value: /^[^\s\p{Emoji}]+$/u, // 空白と絵文字を除外
          message: '商品名で使用できない文字が含まれています',
        },
        onBlur: handleBlur,
      })}
    />
  );
};
