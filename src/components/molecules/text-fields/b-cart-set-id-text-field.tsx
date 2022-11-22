import { TextField } from '@mui/material';
import { Product } from 'API';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

interface Props extends UseFormReturn<Product> {
  disabled: boolean;
}

// const minNumber = 1;
const maxLength = 2;

export const BCartSetIdTextField: React.FC<Props> = ({ formState, register, disabled }) => {
  return (
    <TextField
      type='number'
      id='bCartSetId'
      label='BカートセットID'
      autoComplete='off'
      margin='dense'
      fullWidth
      disabled={disabled}
      inputProps={{
        maxLength: maxLength,
      }}
      error={Boolean(formState.errors.bCartSetId)}
      helperText={formState.errors.bCartSetId && formState.errors.bCartSetId.message}
      {...register('bCartSetId', {
        // pattern: {
        //   value: /^[0-9]+$/i,
        //   message: 'BカートセットIDは半角数字で入力してください',
        // },
        // maxLength: { value: maxLength, message: `BカートセットIDは${maxLength}桁以内で入力してください` },
        // min: { value: minNumber, message: `BカートセットIDは${minNumber}以上で入力してください` },
        // 入力値必須では無い為、nullを許容し値があれば数値変換。setValueAsはValidationを無効にする為、Validationが必要な場合別途実装が必要
        setValueAs: (value) => (value === null || value === '' ? null : Number(value)),
        // valueAsNumber: true,
      })}
    />
  );
};
