import { Checkbox, FormControl, FormControlLabel, FormHelperText } from '@mui/material';
import { Product } from 'API';
import { Controller, UseFormReturn } from 'react-hook-form';

type Props = UseFormReturn<Product> & {
  disabled: boolean;
  isBCartSeparateDeliveryRoute?: boolean;
};

export const BCartSeparateDeliveryRouteCheckbox = ({ control, disabled, isBCartSeparateDeliveryRoute }: Props) => {
  return (
    <Controller
      control={control}
      name='isBCartSeparateDeliveryRoute'
      defaultValue={isBCartSeparateDeliveryRoute ?? false}
      rules={{
        pattern: {
          value: /^true|false+$/i,
          message: 'Bカート別配送経路の値が不正です',
        },
      }}
      render={({ field, formState: { errors } }) => (
        <FormControl error={Boolean(errors.isBCartSeparateDeliveryRoute?.message)}>
          <FormControlLabel
            label={'Bカート別配送経路'}
            control={<Checkbox {...field} defaultChecked={isBCartSeparateDeliveryRoute ?? false} disabled={disabled} />}
          />
          <FormHelperText>
            別配送経路商品でCSVのまとめコードに独自UUIDを設定する場合チェックをつけてください
          </FormHelperText>
          <FormHelperText>{errors.isBCartSeparateDeliveryRoute?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};
