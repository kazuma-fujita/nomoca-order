import { Add } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { Product } from 'API';
import { InputDialog } from 'components/atoms/dialogs/input-dialog';
import { ProductNameTextField } from 'components/atoms/text-fields/product-name-text-field';
import { ProductUnitPriceTextField } from 'components/atoms/text-fields/product-unit-price-text-field';
import { useCreateProduct } from 'hooks/products/use-create-product';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useToggle } from 'react-use';

export const CreateProductButton = () => {
  const useFormReturn = useForm<Product>({ defaultValues: { name: '' } });
  const { handleSubmit, reset: resetForm } = useFormReturn;
  const { createProduct, isLoading, error, resetState } = useCreateProduct();
  const [on, toggle] = useToggle(false);

  const cancelHandler = useCallback(() => {
    resetForm();
    resetState();
    toggle();
  }, [resetForm, resetState, toggle]);

  const submitHandler = handleSubmit(
    useCallback(
      async (data: Product) => {
        try {
          await createProduct(data.name, data.unitPrice);
          cancelHandler();
        } catch (error) {}
      },
      [cancelHandler, createProduct],
    ),
  );

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
        <>
          <ProductNameTextField {...useFormReturn} disabled={isLoading} />
          <ProductUnitPriceTextField {...useFormReturn} disabled={isLoading} />
        </>
      </InputDialog>
    </>
  );
};
