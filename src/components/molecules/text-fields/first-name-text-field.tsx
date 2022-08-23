import { TextField } from '@mui/material';
import { Staff } from 'API';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

type Props = UseFormReturn<Staff> & {
  disabled: boolean;
};

const MAX_LENGTH = 256;

export const FirstNameTextField = ({ formState, register, setValue, disabled }: Props) => {
  // TextFieldからフォーカスが外れたらtrim処理
  const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue('firstName', event.target.value.trim());
  };

  return (
    <TextField
      required
      type='text'
      id='firstName'
      label='名'
      autoComplete='off'
      disabled={disabled}
      inputProps={{
        maxLength: MAX_LENGTH,
      }}
      error={Boolean(formState.errors.firstName)}
      helperText={formState.errors.firstName && formState.errors.firstName.message}
      {...register('firstName', {
        required: '名を入力してください',
        maxLength: { value: MAX_LENGTH, message: '名は' + MAX_LENGTH + '桁で入力してください' },
        pattern: {
          // value: /^\S+$/i, 空白のみ除外
          // value: /^[^\s\p{Emoji}]+$/u, 空白と絵文字を除外
          // value: /^[^\s\p{Symbol}]+$/u, 空白、数学記号、通貨記号、音声記号、絵文字、機種依存文字を除外
          value: /^[^!"#$%&'()*+\-.,/:;<=>?@[\\\]^_`{|}~\s\p{Symbol}]+$/u, // 半角記号、空白、数学記号、通貨記号、音声記号、絵文字、機種依存文字を除外
          message: '名で使用できない文字が含まれています',
        },
        onBlur: handleBlur,
      })}
    />
  );
};
