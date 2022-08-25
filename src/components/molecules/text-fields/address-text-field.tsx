import { TextField } from '@mui/material';
import { Clinic } from 'API';
import { hyphenZenkaku2Hankaku, numericZenkaku2Hankaku } from 'functions/strings/converters';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

type Props = UseFormReturn<Clinic> & {
  disabled: boolean;
};

const MAX_LENGTH = 256;

export const AddressTextField = ({ formState, register, setValue, disabled }: Props) => {
  // TextFieldからフォーカスが外れたら入力値の全角数字ハイフン -> 半角数字ハイフン変換、trim処理
  const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue('address', numericZenkaku2Hankaku(hyphenZenkaku2Hankaku(event.target.value.trim())));
  };

  return (
    <TextField
      required
      type='text'
      id='address'
      label='番地'
      disabled={disabled}
      autoComplete='off'
      fullWidth
      error={Boolean(formState.errors.address)}
      helperText={formState.errors.address ? formState.errors.address.message : '例 1-2-3'}
      inputProps={{
        maxLength: MAX_LENGTH,
      }}
      {...register('address', {
        required: '番地を入力してください',
        maxLength: { value: MAX_LENGTH, message: '番地は' + MAX_LENGTH + '桁で入力してください' },
        pattern: {
          // value: /^[^!"#$%&'()*+.,/:;<=>?@[\\\]^_`{|}~\s\p{Symbol}]+$/u, // ハイフン「-」を除く半角記号、空白、数学記号、通貨記号、音声記号、絵文字、機種依存文字を除外
          value: /^[^\s\p{Symbol}]+$/u, // 空白、数学記号、通貨記号、音声記号、絵文字、機種依存文字を除外
          message: '番地で使用できない文字が含まれています',
        },
        onBlur: handleBlur,
      })}
    />
  );
};
