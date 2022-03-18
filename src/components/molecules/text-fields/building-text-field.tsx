import { TextField } from '@mui/material';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Clinic } from 'API';

type Props = UseFormReturn<Clinic> & {
  disabled: boolean;
};

const MAX_LENGTH = 256;

export const BuildingTextField = ({ formState, register, disabled }: Props) => (
  <TextField
    type='text'
    id='building'
    label='建物名・部屋番号'
    // defaultValue={building}
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
        // 建物名、部屋番号の間など文字列中の空白はありえる為許可。文字列前後の空白はreducerでtrim処理
        value: /^[^$*+/:;<=>?@[\\\]^_`{|}~\p{Symbol}]+$/u,
        message: '建物名・部屋番号で使用できない文字が含まれています',
      },
    })}
  />
);
