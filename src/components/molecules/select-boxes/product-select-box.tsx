import { Add, DeleteForever } from '@mui/icons-material';
import { Box, Button, CircularProgress, IconButton, MenuItem, TextField } from '@mui/material';
import { ErrorAlert } from 'components/atoms/alerts/error-alert';
import { useFetchProductList } from 'hooks/products/use-fetch-product-list';
import { NormalizedProduct } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { useCallback, useState } from 'react';
import { Controller, UseFieldArrayReturn, UseFormReturn } from 'react-hook-form';
import { OrderFormParam, useOrderFormParam } from 'stores/use-order-form-param';

type Props = UseFormReturn<OrderFormParam, object> & {
  fieldArrayReturn: UseFieldArrayReturn;
  // initialReceiptProducts?: NormalizedProduct[] | null;
};

type ProductErrorField = {
  productID: { message: string };
  quantity: { message: string };
};

// 商品個数の数字連番の配列を生成
const quantities = Array.from({ length: 25 }, (_, i) => i + 1);

export const ProductSelectBox = ({ control, fieldArrayReturn }: Props) => {
  const { data: defaultValues } = useOrderFormParam();
  const { data: productList, isLoading, error } = useFetchProductList();
  const [selectedProducts, setSelectedProducts] = useState<NormalizedProduct[]>(defaultValues?.products ?? []);

  const onChangeProduct = useCallback(
    (selectedIndex: number, productID: string) => {
      if (!productList) return;
      const product = productList.find((product) => product.id === productID);
      if (!product) return;
      // 保存されている商品を取得
      const prev = selectedProducts[selectedIndex];
      // 置換する商品object生成
      const next: NormalizedProduct = {
        relationID: `ID-${selectedIndex}`,
        productID: `ID-${selectedIndex}`,
        name: product.name,
        unitPrice: product.unitPrice,
        isExportCSV: product.isExportCSV,
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
          isExportCSV: false,
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

  if (isLoading) return <CircularProgress aria-label='Now loading' />;
  if (error) return <ErrorAlert>{error}</ErrorAlert>;
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
                sx={{ width: '60%' }}
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
          <Button
            onClick={() => fieldArrayReturn.append({ productID: '' })}
            variant='outlined'
            startIcon={<Add />}
            sx={{ maxHeight: 56, minWidth: 114 }}
          >
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
      {/* <Box mt={8} mb={8}>
        <ReceiptTable products={selectedProducts} />
        {orderType === OrderType.singleOrder && (
          <Typography variant='caption'>
            ※ご注文合計金額が10,000円(税抜)未満の場合、別途配送手数料として1,000円(税抜)を頂戴致します。
          </Typography>
        )}
      </Box> */}
    </>
  );
};
