import { Add } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { Product } from 'API';
import { InputDialog } from 'components/atoms/dialogs/input-dialog';
import { useCreateProduct } from 'hooks/products/use-create-product';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useToggle } from 'react-use';
import { useProductList } from 'stores/use-product-list';
import { ProductNameTextField } from '../../atoms/text-fields/product-name-text-field';

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
  const submitButtonLabel = '追加する';
  const label = `商品を${submitButtonLabel}`;
  return (
    <>
      <Button onClick={toggle} variant='outlined' startIcon={<Add />}>
        {label}
      </Button>
      <InputDialog
        dialogTitle={label}
        submitButtonLabel={submitButtonLabel}
        startIcon={<Add />}
        on={on}
        isLoading={isLoading}
        error={error}
        submitHandler={submitHandler}
        cancelHandler={cancelHandler}
      >
        <ProductNameTextField {...useFormReturn} disabled={isLoading} />
      </InputDialog>
    </>
  );
};
