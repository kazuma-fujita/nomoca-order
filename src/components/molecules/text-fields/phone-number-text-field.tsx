import { TextField } from '@mui/material';
import { Clinic } from 'API';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

type Props = UseFormReturn<Clinic> & {
  disabled: boolean;
};

const MIN_LENGTH = 10; // 固定電話番号桁数
const MAX_LENGTH = 11; // 携帯電話番号桁数

export const PhoneNumberTextField = ({ formState, register, disabled }: Props) => (
  <TextField
    required
    type='text'
    id='phoneNumber'
    label='電話番号'
    disabled={disabled}
    autoComplete='off'
    error={Boolean(formState.errors.phoneNumber)}
    helperText={formState.errors.phoneNumber ? formState.errors.phoneNumber.message : 'ハイフンを除く 例 0312345678'}
    inputProps={{
      maxLength: MAX_LENGTH,
    }}
    {...register('phoneNumber', {
      required: '電話番号を入力してください',
      minLength: { value: MIN_LENGTH, message: '電話番号は' + MIN_LENGTH + '桁以上で入力してください' },
      maxLength: { value: MAX_LENGTH, message: '電話番号は' + MAX_LENGTH + '桁以下で入力してください' },
      pattern: {
        value: /^[0-9]+$/,
        message: '電話番号は半角数字で入力してください',
      },
    })}
  />
);
