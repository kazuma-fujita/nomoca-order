import { Add } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { Product } from 'API';
import { useCreateProduct } from 'hooks/products/use-create-product';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useToggle } from 'react-use';
import { InputProductDialog } from './input-product-dialog';
import { useProductList } from 'stores/use-product-list';

export const CreateProductButton = () => {
  const useFormReturn = useForm<Product>({ defaultValues: { name: '' } });
  const { handleSubmit, reset: resetForm } = useFormReturn;
  const { createProduct, isLoading, error, resetState } = useCreateProduct();
  const [on, toggle] = useToggle(false);
  const { data: productList } = useProductList();
  const submitHandler = handleSubmit(
    useCallback(
      async (data: Product) => {
        await createProduct(data.name);
        if (!error) {
          cancelHandler();
        }
      },
      [productList]
    )
  );
  const cancelHandler = useCallback(() => {
    resetForm();
    resetState();
    toggle();
  }, []);
  const label = '追加';
  return (
    <>
      <Button onClick={toggle} variant='outlined' startIcon={<Add />}>
        担当者を{label}する
      </Button>
      <InputProductDialog
        label={label}
        startIcon={<Add />}
        on={on}
        isLoading={isLoading}
        error={error}
        submitHandler={submitHandler}
        cancelHandler={cancelHandler}
        useFormReturn={useFormReturn}
      />
    </>
  );
};
