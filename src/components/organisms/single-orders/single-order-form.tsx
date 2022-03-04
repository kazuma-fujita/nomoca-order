import { Box, FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@mui/material';
import { DeliveryType } from 'API';
import { OrderForm } from 'components/organisms/orders/order-form';
import { useOrderForm } from 'hooks/orders/use-order-form';
import { Controller, UseFieldArrayReturn } from 'react-hook-form';
import { useOrderFormParam } from 'stores/use-order-form-param';

export const SingleOrderForm = () => {
  const { formReturn, fieldArrayReturn, submitHandler, cancelHandler } = useOrderForm();
  const { data } = useOrderFormParam();
  return (
    <OrderForm
      formReturn={formReturn}
      fieldArrayReturn={fieldArrayReturn as UseFieldArrayReturn}
      submitHandler={submitHandler}
      cancelHandler={cancelHandler}
      initialReceiptProducts={data?.products}
    >
      <Box mt={8} mb={8} mr={2} sx={{ display: 'flex', alignContent: 'center', alignItems: 'center' }}>
        <Controller
          name='deliveryType'
          control={formReturn.control}
          defaultValue={DeliveryType.regular}
          rules={{ required: '配送方法を選択してください' }}
          render={({ field, formState: { errors } }) => (
            <FormControl error={Boolean(errors.deliveryType)}>
              <FormLabel id='delivery-type-group-label'>配送方法</FormLabel>
              <RadioGroup
                row
                aria-labelledby='delivery-type-group-label'
                name={field.name}
                onChange={(e) => field.onChange(e.target.value)}
                value={field.value === undefined ? DeliveryType.regular : field.value}
              >
                <FormControlLabel value={DeliveryType.regular} control={<Radio />} label='通常配送' />
                <FormControlLabel value={DeliveryType.express} control={<Radio />} label='速達配送 +1,000円(税抜)' />
              </RadioGroup>
              <FormHelperText>{errors.deliveryType && errors.deliveryType.message}</FormHelperText>
              <FormHelperText error={false}>
                到着までの目安は通常配送 7営業日、速達配送 2営業日となります。
              </FormHelperText>
            </FormControl>
          )}
        />
      </Box>
    </OrderForm>
  );
};
