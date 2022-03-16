import { Checkbox, FormControl, FormControlLabel, FormHelperText } from '@mui/material';
import { Product } from 'API';
import { Controller, UseFormReturn } from 'react-hook-form';

type Props = UseFormReturn<Product> & {
  disabled: boolean;
  isDisabled?: boolean;
};

export const DisabledCheckbox = ({ control, disabled, isDisabled }: Props) => {
  return (
    <Controller
      control={control}
      name='disabled'
      defaultValue={isDisabled ?? false}
      rules={{
        pattern: {
          value: /^true|false+$/i,
          message: '無効の値が不正です',
        },
      }}
      render={({ field, formState: { errors } }) => (
        <FormControl error={Boolean(errors.disabled?.message)}>
          <FormControlLabel
            label={'無効'}
            control={<Checkbox {...field} defaultChecked={isDisabled ?? false} disabled={disabled} />}
          />
          <FormHelperText>無効にするとこの商品は注文時の商品プルダウンに表示されません</FormHelperText>
          <FormHelperText>{errors.disabled?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};
