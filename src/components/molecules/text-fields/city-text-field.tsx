import { TextField } from '@mui/material';
import { Clinic } from 'API';
import { numericZenkaku2Hankaku } from 'functions/strings/converters';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

type Props = UseFormReturn<Clinic> & {
  disabled: boolean;
};

const MAX_LENGTH = 256;

export const CityTextField = ({ formState, register, setValue, disabled }: Props) => {
  // TextFieldからフォーカスが外れたら入力値の全角数字 -> 半角数字変換、trim処理
  // 〒0010000 北海道札幌市北区北２４条西 のような市区町村に全角数字が入る地名が存在する為、半角数字変換処理追加
  const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue('city', numericZenkaku2Hankaku(event.target.value.trim()));
  };

  return (
    <TextField
      required
      type='text'
      id='city'
      label='市区町村'
      disabled={disabled}
      autoComplete='off'
      fullWidth
      error={Boolean(formState.errors.city)}
      helperText={formState.errors.city ? formState.errors.city.message : '例 渋谷区渋谷'}
      inputProps={{
        maxLength: MAX_LENGTH,
      }}
      {...register('city', {
        required: '市区町村を入力してください',
        maxLength: { value: MAX_LENGTH, message: '市区町村は' + MAX_LENGTH + '桁で入力してください' },
        pattern: {
          // value: /^[^!"#$%&'()*+.\-,/:;<=>?@[\\\]^_`{|}~\s\p{Symbol}]+$/u, // 半角記号、空白、数学記号、通貨記号、音声記号、絵文字、機種依存文字を除外
          value: /^[^\s\p{Symbol}]+$/u, // 空白、数学記号、通貨記号、音声記号、絵文字、機種依存文字を除外
          message: '市区町村で使用できない文字が含まれています',
        },
        onBlur: handleBlur,
      })}
      InputLabelProps={{ shrink: true }} // 郵便番号検索時にlabelと検索結果が重なる為、labelを事前に縮小
    />
  );
};
