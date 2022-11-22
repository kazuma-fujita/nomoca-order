import { TextField } from '@mui/material';
import { hyphenZenkaku2Hankaku, numericZenkaku2Hankaku } from 'functions/strings/converters';
import { SearchParam, useSearchParam } from 'hooks/admins/use-search-param';
import { UseFormReturn } from 'react-hook-form';

const MIN_LENGTH = 10;
const MAX_LENGTH = 10;

type SearchProps = UseFormReturn<SearchParam> & {
  disabled: boolean;
};

export const SearchFromDateTextField = ({ formState, register, setValue, disabled }: SearchProps) => {
  const { searchState } = useSearchParam();
  // TextFieldからフォーカスが外れたら入力値の全角数字ハイフン -> 半角数字ハイフン変換、trim処理
  const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue('fromDate', numericZenkaku2Hankaku(hyphenZenkaku2Hankaku(event.target.value.trim())));
  };

  return (
    <TextField
      type='text'
      id='deliveredAt'
      label='発送日検索開始日'
      defaultValue={searchState.fromDate}
      disabled={disabled}
      autoComplete='off'
      error={Boolean(formState.errors.fromDate)}
      helperText={formState.errors.fromDate ? formState.errors.fromDate.message : 'ハイフン区切り 例 2023-01-01'}
      inputProps={{
        maxLength: MAX_LENGTH,
      }}
      {...register('fromDate', {
        minLength: { value: MIN_LENGTH, message: '開始日は' + MIN_LENGTH + '桁で入力してください' },
        maxLength: { value: MAX_LENGTH, message: '開始日は' + MAX_LENGTH + '桁で入力してください' },
        pattern: {
          value: /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
          message: '開始日は日付をハイフン区切りで入力してください',
        },
        onBlur: handleBlur,
      })}
    />
  );
};

export const SearchToDateTextField = ({ formState, register, setValue, disabled }: SearchProps) => {
  const { searchState } = useSearchParam();
  // TextFieldからフォーカスが外れたら入力値の全角数字ハイフン -> 半角数字ハイフン変換、trim処理
  const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue('toDate', numericZenkaku2Hankaku(hyphenZenkaku2Hankaku(event.target.value.trim())));
  };

  return (
    <TextField
      type='text'
      id='deliveredAt'
      label='終了日'
      defaultValue={searchState.toDate}
      disabled={disabled}
      autoComplete='off'
      error={Boolean(formState.errors.toDate)}
      helperText={formState.errors.toDate ? formState.errors.toDate.message : '例 2023-01-31'}
      inputProps={{
        maxLength: MAX_LENGTH,
      }}
      {...register('toDate', {
        minLength: { value: MIN_LENGTH, message: '終了日は' + MIN_LENGTH + '桁で入力してください' },
        maxLength: { value: MAX_LENGTH, message: '終了日は' + MAX_LENGTH + '桁で入力してください' },
        pattern: {
          value: /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
          message: '終了日は日付をハイフン区切りで入力してください',
        },
        onBlur: handleBlur,
      })}
    />
  );
};
