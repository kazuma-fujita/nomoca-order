import { TextField } from '@mui/material';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Clinic } from 'API';
import { hyphenZenkaku2Hankaku, numericZenkaku2Hankaku } from 'functions/strings/converters';

type Props = UseFormReturn<Clinic> & {
  disabled: boolean;
};

const MAX_LENGTH = 256;

export const BuildingTextField = ({ formState, register, setValue, disabled }: Props) => {
  // 入力値の全角数字ハイフン -> 半角数字ハイフン変換処理。建物名部屋番号の間は空白がありえる為、trim処理は入れない
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue('building', numericZenkaku2Hankaku(hyphenZenkaku2Hankaku(event.target.value)));
  };
  // TextFieldからフォーカスが外れたらtrim処理
  const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue('building', event.target.value.trim());
  };

  return (
    <TextField
      type='text'
      id='building'
      label='建物名・部屋番号'
      onInput={handleInput}
      autoComplete='off'
      fullWidth
      disabled={disabled}
      error={Boolean(formState.errors.building)}
      helperText={formState.errors.building ? formState.errors.building.message : '例 渋谷ビル 103'}
      inputProps={{
        maxLength: MAX_LENGTH,
      }}
      {...register('building', {
        maxLength: { value: MAX_LENGTH, message: '建物名・部屋番号は' + MAX_LENGTH + '桁で入力してください' },
        pattern: {
          // 「!"#%&'()-.,」を除く半角記号、数学記号、通貨記号、音声記号、絵文字、機種依存文字を除外
          // 建物名、部屋番号の間など文字列中の空白はありえる為許可
          value: /^[^$*+/:;<=>?@[\\\]^_`{|}~\p{Symbol}]+$/u,
          message: '建物名・部屋番号で使用できない文字が含まれています',
        },
        onBlur: handleBlur,
      })}
    />
  );
};
