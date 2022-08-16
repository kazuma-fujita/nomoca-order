import { TextField } from '@mui/material';
import { Clinic } from 'API';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

type Props = UseFormReturn<Clinic> & {
  disabled: boolean;
};

const MIN_LENGTH = 3;
const MAX_LENGTH = 4;

export const StateTextField = ({ formState, register, disabled }: Props) => (
  <TextField
    required
    type='text'
    id='state'
    label='都道府県'
    autoComplete='off'
    disabled={disabled}
    error={Boolean(formState.errors.state)}
    helperText={formState.errors.state ? formState.errors.state.message : '例 東京都'}
    inputProps={{
      maxLength: MAX_LENGTH,
    }}
    {...register('state', {
      required: '都道府県を入力してください',
      pattern: {
        value:
          /^(北海道|青森県|岩手県|宮城県|秋田県|山形県|福島県|茨城県|栃木県|群馬県|埼玉県|千葉県|東京都|神奈川県|新潟県|富山県|石川県|福井県|山梨県|長野県|岐阜県|静岡県|愛知県|三重県|滋賀県|京都府|大阪府|兵庫県|奈良県|和歌山県|鳥取県|島根県|岡山県|広島県|山口県|徳島県|香川県|愛媛県|高知県|福岡県|佐賀県|長崎県|熊本県|大分県|宮崎県|鹿児島県|沖縄県)$/,
        message: '都道府県を正しく入力してください',
      },
      minLength: { value: MIN_LENGTH, message: '都道府県は3文字以上で入力してください' },
      maxLength: { value: MAX_LENGTH, message: '都道府県は4文字以下で入力してください' },
    })}
    InputLabelProps={{ shrink: true }} // 郵便番号検索時にlabelと検索結果が重なる為、labelを事前に縮小
  />
);
