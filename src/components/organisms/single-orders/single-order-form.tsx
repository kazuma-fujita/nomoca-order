import { Box, Chip, Divider, FormControl, FormControlLabel, FormHelperText, Radio, RadioGroup } from '@mui/material';
import { DeliveryType } from 'API';
import { OrderInputForm } from 'components/organisms/orders/order-input-form';
import { useInputOrder } from 'hooks/orders/use-input-order';
import { Controller, UseFieldArrayReturn } from 'react-hook-form';

export const SingleOrderForm = () => {
  const { formReturn, fieldArrayReturn, submitHandler, cancelHandler } = useInputOrder();
  return (
    <OrderInputForm
      formReturn={formReturn}
      fieldArrayReturn={fieldArrayReturn as UseFieldArrayReturn}
      submitHandler={submitHandler}
      cancelHandler={cancelHandler}
    >
      <Box mt={8}>
        <Divider textAlign='left'>
          <Chip label='配送方法' />
        </Divider>
      </Box>
      <Box mt={4} mb={8} mr={2} ml={4} sx={{ display: 'flex', alignContent: 'center', alignItems: 'center' }}>
        <Controller
          name='deliveryType'
          control={formReturn.control}
          defaultValue={DeliveryType.regular}
          rules={{ required: '配送方法を選択してください' }}
          render={({ field, formState: { errors } }) => (
            <FormControl error={Boolean(errors.deliveryType)}>
              {/* <FormLabel id='delivery-type-group-label'>配送方法</FormLabel> */}
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
    </OrderInputForm>
  );
};
