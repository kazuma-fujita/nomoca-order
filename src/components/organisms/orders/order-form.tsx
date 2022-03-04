import AddBoxIcon from '@mui/icons-material/AddBox';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
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
  Typography,
} from '@mui/material';
import { DeliveryType } from 'API';
import Form from 'components/atoms/form';
import { ReceiptTable } from 'components/molecules/receipt-table';
import { NormalizedProduct } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { BaseSyntheticEvent, useCallback, useState } from 'react';
import { Controller, UseFieldArrayReturn, UseFormReturn } from 'react-hook-form';
import { OrderFormParam } from 'stores/use-order-form-param';
import { useProductList } from 'stores/use-product-list';
import { useStaffList } from 'stores/use-staff-list';
import ReactNode from 'react';

type Props = {
  submitHandler: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  cancelHandler: () => void;
  formReturn: UseFormReturn<OrderFormParam, object>;
  fieldArrayReturn: UseFieldArrayReturn;
  initialReceiptProducts?: NormalizedProduct[] | null;
};

type ProductErrorField = {
  productID: { message: string };
  quantity: { message: string };
};

// 数字連番の配列を生成
const quantities = Array.from({ length: 25 }, (_, i) => i + 1);

export const OrderForm: React.FC<Props> = ({
  submitHandler,
  cancelHandler,
  formReturn,
  fieldArrayReturn,
  initialReceiptProducts,
  children,
}) => {
  const { data: productList } = useProductList();
  const { data: staffList } = useStaffList();
  const [selectedProducts, setSelectedProducts] = useState<NormalizedProduct[]>(initialReceiptProducts ?? []);

  const onChangeProduct = useCallback(
    (selectedIndex: number, productID: string) => {
      const product = productList!.find((product) => product.id === productID);
      if (!product) return;
      // 保存されている商品を取得
      const prev = selectedProducts[selectedIndex];
      // 置換する商品object生成
      const next: NormalizedProduct = {
        relationID: `ID-${selectedIndex}`,
        productID: `ID-${selectedIndex}`,
        name: product.name,
        unitPrice: product.unitPrice,
        quantity: prev ? prev.quantity : 1, // 個数は引き継ぎ
      };
      // 既存選択商品があればobject更新、無ければobject追加
      const updateProducts = prev
        ? selectedProducts.map((product, index) => (index === selectedIndex ? next : product))
        : [...selectedProducts, next];
      setSelectedProducts(updateProducts);
    },
    [selectedProducts, productList],
  );

  const onChangeQuantity = useCallback(
    (selectedIndex: number, quantity: number) => {
      // 保存されている選択済み商品を取得
      const prev = selectedProducts[selectedIndex];
      if (prev) {
        const next: NormalizedProduct = { ...prev, quantity: quantity };
        const replacedProducts = selectedProducts.map((product, index) => (index === selectedIndex ? next : product));
        setSelectedProducts(replacedProducts);
      } else {
        // dummy object 生成
        const next: NormalizedProduct = {
          relationID: `ID-${selectedIndex}`,
          productID: `ID-${selectedIndex}`,
          name: '',
          unitPrice: 0,
          quantity: quantity,
        };
        setSelectedProducts([...selectedProducts, next]);
      }
    },
    [selectedProducts],
  );

  const onDeleteProduct = useCallback(
    (selectedIndex: number) => {
      setSelectedProducts(selectedProducts.filter((_, index) => index !== selectedIndex));
    },
    [selectedProducts],
  );

  return (
    <Form onSubmit={submitHandler}>
      {fieldArrayReturn.fields.map((item, index) => (
        <Box mt={2} mb={2} key={item.id} sx={{ display: 'flex' }}>
          <Controller
            name={`products.${index}.productID`}
            control={formReturn.control}
            defaultValue={''}
            rules={{ required: '商品を選択してください' }}
            render={({ field, formState: { errors } }) => (
              <TextField
                name={field.name}
                select
                fullWidth
                label='商品'
                onChange={(e) => {
                  onChangeProduct(index, e.target.value);
                  field.onChange(e.target.value);
                }}
                value={field.value === undefined ? '' : field.value}
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
                // {...field}
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
                name={field.name}
                select
                sx={{ width: 100 }}
                label='数量'
                onChange={(e) => {
                  onChangeQuantity(index, parseInt(e.target.value, 10));
                  field.onChange(e.target.value);
                }}
                value={field.value === undefined ? '' : field.value}
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
                // {...field}
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
            <IconButton
              onClick={() => {
                onDeleteProduct(index);
                fieldArrayReturn.remove(index);
              }}
            >
              <DisabledByDefaultIcon />
            </IconButton>
          )}
          <IconButton onClick={() => fieldArrayReturn.append({ productID: '' })}>
            <AddBoxIcon />
          </IconButton>
        </Box>
      ))}
      <Box mt={8} mb={8}>
        <ReceiptTable products={selectedProducts} />
        <Typography variant='caption'>
          ※ご注文合計金額が10,000円(税抜)未満の場合、別途配送手数料として1,000円(税抜)を頂戴致します。
        </Typography>
      </Box>
      {children}
      <Box mt={8} mb={8}>
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
      <Box mt={8} mb={8} width='auto' display='flex' justifyContent='center'>
        <Button onClick={cancelHandler}>キャンセル</Button>
        <Box mr={18} />
        <Button type='submit' variant='contained' startIcon={<ArrowForwardIosIcon />}>
          確認する
        </Button>
      </Box>
    </Form>
  );
};
