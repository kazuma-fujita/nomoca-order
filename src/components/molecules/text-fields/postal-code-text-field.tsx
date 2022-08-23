import { TextField } from '@mui/material';
import { Clinic } from 'API';
import { numericZenkaku2Hankaku } from 'functions/strings/converters';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

type Props = UseFormReturn<Clinic> & {
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
};

const MAX_LENGTH = 7;

export const PostalCodeTextField = ({ formState, register, setValue, handleOnChange, disabled }: Props) => {
  // 入力値のtrimと全角数字 -> 半角数字変換処理
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue('postalCode', numericZenkaku2Hankaku(event.target.value.trim()));
  };

  return (
    <TextField
      required
      type='tel'
      id='postalCode'
      label='郵便番号'
      onInput={handleInput}
      disabled={disabled}
      autoComplete='off'
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
};
