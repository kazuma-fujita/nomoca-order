import { TextField } from '@mui/material';
import { Clinic } from 'API';
import { UseFormReturn } from 'react-hook-form';
import { SingleOrderSearchParam } from '../../organisms/admins/single-orders/search-form/single-order-search-form';

type Props = UseFormReturn<Clinic> & {
  disabled: boolean;
};

const MAX_LENGTH = 256;

export const ClinicNameTextField = ({ formState, register, setValue, disabled }: Props) => {
  // TextFieldからフォーカスが外れたらtrim処理
  const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue('name', event.target.value.trim());
  };

  return (
    <TextField
      required
      type='text'
      id='name'
      label='医院名'
      autoComplete='off'
      fullWidth
      disabled={disabled}
      inputProps={{
        maxLength: MAX_LENGTH,
      }}
      error={Boolean(formState.errors.name)}
      helperText={formState.errors.name ? formState.errors.name.message : '例 渋谷駅前クリニック'}
      {...register('name', {
        required: '医院名を入力してください',
        maxLength: { value: MAX_LENGTH, message: '医院名は' + MAX_LENGTH + '桁で入力してください' },
        pattern: {
          value: /^\S+$/i, // 空白のみ除外
          // value: /^[^\s\p{Emoji}]+$/u, // 空白と絵文字を除外
          // value: /^[^\s\p{Symbol}]+$/u, 空白、数学記号、通貨記号、音声記号、絵文字、機種依存文字を除外
          // value: /^[^!"#$%&'()*+\-.,/:;<=>?@[\\\]^_`{|}~\s\p{Symbol}]+$/u, 半角記号、空白、数学記号、通貨記号、音声記号、絵文字、機種依存文字を除外
          message: '医院名で使用できない文字が含まれています',
        },
        onBlur: handleBlur,
      })}
    />
  );
};

type SearchProps = UseFormReturn<SingleOrderSearchParam> & {
  disabled: boolean;
};

export const SearchClinicNameTextField = ({ formState, register, disabled }: SearchProps) => {
  return (
    <TextField
      type='text'
      id='name'
      label='医院名'
      autoComplete='off'
      fullWidth
      disabled={disabled}
      inputProps={{
        maxLength: MAX_LENGTH,
      }}
      error={Boolean(formState.errors.name)}
      helperText={formState.errors.name ? formState.errors.name.message : '例 渋谷駅前クリニック'}
      {...register('name', {
        maxLength: { value: MAX_LENGTH, message: '医院名は' + MAX_LENGTH + '桁で入力してください' },
        pattern: {
          value: /^\S+$/i, // 空白のみ除外
          message: '医院名で使用できない文字が含まれています',
        },
      })}
    />
  );
};
