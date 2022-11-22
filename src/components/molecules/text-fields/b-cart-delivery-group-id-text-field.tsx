import { TextField } from '@mui/material';
import { Product } from 'API';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

interface Props extends UseFormReturn<Product> {
  disabled: boolean;
}

// const minNumber = 1;
const maxLength = 1;

export const BCartDeliveryGroupIdTextField: React.FC<Props> = ({ formState, register, disabled }) => {
  return (
    <TextField
      type='number'
      id='bCartDeliveryGroupId'
      label='Bカート配送グループ'
      autoComplete='off'
      margin='dense'
      fullWidth
      disabled={disabled}
      inputProps={{
        maxLength: maxLength,
      }}
      error={Boolean(formState.errors.bCartDeliveryGroupId)}
      helperText={formState.errors.bCartDeliveryGroupId && formState.errors.bCartDeliveryGroupId.message}
      {...register('bCartDeliveryGroupId', {
        // pattern: {
        //   value: /^[0-9]+$/i,
        //   message: 'Bカート配送グループは半角数字で入力してください',
        // },
        // maxLength: { value: maxLength, message: `Bカート配送グループは${maxLength}桁以内で入力してください` },
        // min: { value: minNumber, message: `Bカート配送グループは${minNumber}以上で入力してください` },
        // 入力値必須では無い為、nullを許容し値があれば数値変換。setValueAsはValidationを無効にする為、Validationが必要な場合別途実装が必要
        setValueAs: (value) => (value === null || value === '' ? null : Number(value)),
        // valueAsNumber: true,
      })}
    />
  );
};
