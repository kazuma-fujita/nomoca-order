import { Add, Clear, Delete, DeleteForever, RemoveCircle } from '@mui/icons-material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import { Box, Button, IconButton, MenuItem, TextField, Typography } from '@mui/material';
import { OrderType } from 'API';
import { ReceiptTable } from 'components/molecules/receipt-table';
import { NormalizedProduct } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { useCallback, useState } from 'react';
import { Controller, UseFieldArrayReturn, UseFormReturn } from 'react-hook-form';
import { OrderFormParam, useOrderFormParam } from 'stores/use-order-form-param';
import { useProductList } from 'stores/use-product-list';

type Props = UseFormReturn<OrderFormParam, object> & {
  fieldArrayReturn: UseFieldArrayReturn;
  initialReceiptProducts?: NormalizedProduct[] | null;
};

type ProductErrorField = {
  productID: { message: string };
  quantity: { message: string };
};

// 商品個数の数字連番の配列を生成
const quantities = Array.from({ length: 25 }, (_, i) => i + 1);

export const ProductSelectBox = ({ control, fieldArrayReturn, initialReceiptProducts }: Props) => {
  const { orderType } = useOrderFormParam();
  const { data: productList } = useProductList();
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
    <>
      {fieldArrayReturn.fields.map((item, index) => (
        <Box mt={2} mb={2} key={item.id} sx={{ display: 'flex' }}>
          <Controller
            name={`products.${index}.productID`}
            control={control}
            defaultValue={''}
            rules={{ required: '商品を選択してください' }}
            render={({ field, formState: { errors } }) => (
              <TextField
                name={field.name}
                select
                // fullWidth
                sx={{ width: '65%' }}
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
            control={control}
            defaultValue={1}
            rules={{ required: '数量を選択してください' }}
            render={({ field, formState: { errors } }) => (
              <TextField
                name={field.name}
                select
                sx={{ width: 72 }}
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
          <Box ml={2} />
          <Button onClick={() => fieldArrayReturn.append({ productID: '' })} variant='outlined' startIcon={<Add />}>
            {'商品追加'}
          </Button>
          <Box ml={1} />
          {index !== 0 && (
            <IconButton
              onClick={() => {
                onDeleteProduct(index);
                fieldArrayReturn.remove(index);
              }}
            >
              <DeleteForever color='error' />
            </IconButton>
          )}
        </Box>
      ))}
      <Box mt={8} mb={8}>
        <ReceiptTable products={selectedProducts} />
        {orderType === OrderType.singleOrder && (
          <Typography variant='caption'>
            ※ご注文合計金額が10,000円(税抜)未満の場合、別途配送手数料として1,000円(税抜)を頂戴致します。
          </Typography>
        )}
      </Box>
    </>
  );
};
