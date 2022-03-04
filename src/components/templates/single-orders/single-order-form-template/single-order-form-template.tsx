import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { DeliveryType } from 'API';
import { OrderForm } from 'components/organisms/orders/order-form';
import { NormalizedProduct } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { BaseSyntheticEvent } from 'react';
import { Controller, UseFieldArrayReturn, UseFormReturn } from 'react-hook-form';
import { OrderFormParam } from 'stores/use-order-form-param';

type Props = {
  submitHandler: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  cancelHandler: () => void;
  formReturn: UseFormReturn<OrderFormParam, object>;
  fieldArrayReturn: UseFieldArrayReturn;
  initialReceiptProducts?: NormalizedProduct[] | null;
};

export const SingleOrderFormTemplate = ({
  submitHandler,
  cancelHandler,
  formReturn,
  fieldArrayReturn,
  initialReceiptProducts,
}: Props) => {
  return (
    <>
      <Typography variant='h5' textAlign='center'>
        注文を入力する
      </Typography>
      <Box mb={8} />
      <OrderForm
        formReturn={formReturn}
        fieldArrayReturn={fieldArrayReturn as UseFieldArrayReturn}
        submitHandler={submitHandler}
        cancelHandler={cancelHandler}
        initialReceiptProducts={initialReceiptProducts}
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
    </>
  );
};
