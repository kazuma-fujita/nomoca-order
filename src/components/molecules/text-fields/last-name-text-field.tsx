import { TextField } from '@mui/material';
import { Staff } from 'API';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

type Props = UseFormReturn<Staff> & {
  disabled: boolean;
};

const MAX_LENGTH = 256;

export const LastNameTextField = ({ formState, register, disabled }: Props) => {
  return (
    <TextField
      required
      type='text'
      id='lastName'
      label='性'
      autoComplete='off'
      // margin='dense'
      // fullWidth
      // autoFocus
      disabled={disabled}
      inputProps={{
        maxLength: MAX_LENGTH,
      }}
      error={Boolean(formState.errors.lastName)}
      helperText={formState.errors.lastName && formState.errors.lastName.message}
      {...register('lastName', {
        required: '性を入力してください',
        maxLength: { value: MAX_LENGTH, message: '性は' + MAX_LENGTH + '桁で入力してください' },
        pattern: {
          // value: /^\S+$/i, 空白のみ除外
          // value: /^[^\s\p{Emoji}]+$/u, 空白と絵文字を除外
          // value: /^[^\s\p{Symbol}]+$/u, 空白、数学記号、通貨記号、音声記号、絵文字、機種依存文字を除外
          value: /^[^!"#$%&'()*+\-.,/:;<=>?@[\\\]^_`{|}~\s\p{Symbol}]+$/u, // 半角記号、空白、数学記号、通貨記号、音声記号、絵文字、機種依存文字を除外
          message: '性で使用できない文字が含まれています',
        },
      })}
    />
  );
};
