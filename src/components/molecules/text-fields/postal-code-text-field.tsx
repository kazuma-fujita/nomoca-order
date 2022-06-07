import { TextField } from '@mui/material';
import { Clinic } from 'API';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

type Props = UseFormReturn<Clinic> & {
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
};

const MAX_LENGTH = 7;

export const PostalCodeTextField = ({ formState, register, handleOnChange, disabled }: Props) => (
  <TextField
    required
    type='tel'
    id='postalCode'
    label='郵便番号'
    disabled={disabled}
    autoComplete='off'
    // autoComplete='postal-code'
    // onChange={handleOnChange}
    // 郵便番号検索で動的にtrim処理をする為valueに値をセット
    // value={postalCode}
    error={Boolean(formState.errors.postalCode)}
    helperText={formState.errors.postalCode ? formState.errors.postalCode.message : 'ハイフンを除く 例 1234567'}
    inputProps={{
      maxLength: MAX_LENGTH,
    }}
    {...register('postalCode', {
      required: '郵便番号を入力してください',
      pattern: {
        value: /^[0-9]+$/,
        message: '郵便番号は半角数字で入力してください',
      },
      minLength: { value: MAX_LENGTH, message: '郵便番号は7桁で入力してください' },
      maxLength: { value: MAX_LENGTH, message: '郵便番号は7桁で入力してください' },
      onChange: handleOnChange,
    })}
  />
);
