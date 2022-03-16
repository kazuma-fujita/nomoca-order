import { Checkbox, FormControl, FormControlLabel, FormHelperText } from '@mui/material';
import { Product } from 'API';
import { Controller, UseFormReturn } from 'react-hook-form';

type Props = UseFormReturn<Product> & {
  disabled: boolean;
  isExportCSV?: boolean;
};

export const ExportCSVCheckbox = ({ control, disabled, isExportCSV }: Props) => {
  return (
    <Controller
      control={control}
      name='isExportCSV'
      defaultValue={isExportCSV ?? false}
      rules={{
        pattern: {
          value: /^true|false+$/i,
          message: 'CSV出力の値が不正です',
        },
      }}
      render={({ field, formState: { errors } }) => (
        <FormControl error={Boolean(errors.isExportCSV?.message)}>
          <FormControlLabel
            label={'CSV出力'}
            control={<Checkbox {...field} defaultChecked={isExportCSV ?? false} disabled={disabled} />}
          />
          <FormHelperText>この商品をCSVに出力する場合はチェックをつけてください</FormHelperText>
          <FormHelperText>{errors.isExportCSV?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};
