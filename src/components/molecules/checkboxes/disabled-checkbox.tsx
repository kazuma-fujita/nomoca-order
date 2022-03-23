import { Checkbox, FormControl, FormControlLabel, FormHelperText } from '@mui/material';
import { Product, Staff } from 'API';
import { Control, Controller, FieldValues, UseFormReturn } from 'react-hook-form';

type Props = UseFormReturn<Staff | Product> & {
  disabled: boolean;
  helperTextLabel: string;
  isDisabled?: boolean;
};

export const DisabledCheckbox = ({ control, disabled, helperTextLabel, isDisabled }: Props) => {
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
          <FormHelperText>
            無効にするとこの{helperTextLabel}は注文時の{helperTextLabel}プルダウンに表示されません
          </FormHelperText>
          <FormHelperText>{errors.disabled?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};
