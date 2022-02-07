import AddBoxIcon from '@mui/icons-material/AddBox';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { DeliveryType } from 'API';
import Form from 'components/atoms/form';
import { BaseSyntheticEvent, ReactElement } from 'react';
import { Controller, UseFieldArrayReturn, UseFormReturn } from 'react-hook-form';
import { OrderFormParam } from 'stores/use-order-form-param';
import { useProductList } from 'stores/use-product-list';
import { useStaffList } from 'stores/use-staff-list';

type Props = {
  startIcon: ReactElement;
  submitHandler: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  cancelHandler: () => void;
  formReturn: UseFormReturn<OrderFormParam, object>;
  fieldArrayReturn: UseFieldArrayReturn;
};

type ProductErrorField = {
  productID: { message: string };
  quantity: { message: string };
};

// 数字連番の配列を生成
const quantities = Array.from({ length: 20 }, (_, i) => i + 1);

export const InputSingleOrder = ({ startIcon, submitHandler, cancelHandler, formReturn, fieldArrayReturn }: Props) => {
  const { data: productList } = useProductList();
  const { data: staffList } = useStaffList();
  return (
    <Form onSubmit={submitHandler}>
      <h2>注文を入力する</h2>
      {fieldArrayReturn.fields.map((item, index) => (
        <Box mt={2} mb={2} key={item.id} sx={{ display: 'flex' }}>
          <Controller
            name={`products.${index}.productID`}
            control={formReturn.control}
            defaultValue={''}
            rules={{ required: '商品を選択してください' }}
            render={({ field, formState: { errors } }) => (
              <TextField
                select
                fullWidth
                label='商品'
                error={Boolean(
                  errors.products &&
                    (errors.products as ProductErrorField[])[index] &&
                    'productID' in (errors.products as ProductErrorField[])[index],
                )}
                helperText={
                  errors.products &&
                  (errors.products as ProductErrorField[])[index] &&
                  'productID' in (errors.products as ProductErrorField[])[index] &&
                  (errors.products as ProductErrorField[])[index].productID.message
                }
                {...field}
              >
                {productList &&
                  productList.map((product) => (
                    <MenuItem key={product.id} value={product.id}>
                      {product.name}
                    </MenuItem>
                  ))}
              </TextField>
            )}
          />
          <Box mr={2} />
          <Controller
            name={`products.${index}.quantity`}
            control={formReturn.control}
            defaultValue={1}
            rules={{ required: '数量を選択してください' }}
            render={({ field, formState: { errors } }) => (
              <TextField
                select
                sx={{ width: 100 }}
                label='数量'
                error={Boolean(
                  errors.products &&
                    (errors.products as ProductErrorField[])[index] &&
                    'quantity' in (errors.products as ProductErrorField[])[index],
                )}
                helperText={
                  errors.products &&
                  (errors.products as ProductErrorField[])[index] &&
                  'quantity' in (errors.products as ProductErrorField[])[index] &&
                  (errors.products as ProductErrorField[])[index].quantity.message
                }
                {...field}
              >
                {quantities.map((quantity, index) => (
                  <MenuItem key={index} value={quantity}>
                    {quantity}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          {index !== 0 && (
            <IconButton onClick={() => fieldArrayReturn.remove(index)}>
              <DisabledByDefaultIcon />
            </IconButton>
          )}
          <IconButton onClick={() => fieldArrayReturn.append({ productID: '' })}>
            <AddBoxIcon />
          </IconButton>
        </Box>
      ))}
      <Box mt={2} mb={2} sx={{ display: 'flex', alignContent: 'center', alignItems: 'center' }}>
        <Box mr={2} />
        <Controller
          name='deliveryType'
          control={formReturn.control}
          defaultValue={DeliveryType.regular}
          rules={{ required: '配送方法を選択してください' }}
          render={({ field, formState: { errors } }) => (
            <FormControl error={Boolean(errors.deliveryType)}>
              <FormLabel id='delivery-type-group-label'>配送方法</FormLabel>
              <RadioGroup row aria-labelledby='delivery-type-group-label' name='deliveryType'>
                <FormControlLabel value={DeliveryType.regular} control={<Radio />} label='通常配送' />
                <FormControlLabel value={DeliveryType.express} control={<Radio />} label='速達配送 +1,000円(税抜)' />
              </RadioGroup>
              <FormHelperText>到着までの目安は通常発送 7営業日、速達発送 2営業日となります。</FormHelperText>
              <FormHelperText>{errors.deliveryType && errors.deliveryType.message}</FormHelperText>
            </FormControl>
          )}
        />
      </Box>
      <Box mt={2} mb={2}>
        <Controller
          name='staffID'
          control={formReturn.control}
          defaultValue={''}
          rules={{ required: '担当者を選択してください' }}
          render={({ field, formState: { errors } }) => (
            <TextField
              select
              fullWidth
              label='担当者'
              error={Boolean(errors.staffID)}
              helperText={errors.staffID && errors.staffID.message}
              {...field}
            >
              {staffList &&
                staffList.map((staff) => (
                  <MenuItem key={staff.id} value={staff.id}>
                    {staff.name}
                  </MenuItem>
                ))}
            </TextField>
          )}
        />
      </Box>
      <Button onClick={cancelHandler}>キャンセル</Button>
      <Button type='submit' variant='contained' startIcon={startIcon}>
        確認する
      </Button>
    </Form>
  );
};
