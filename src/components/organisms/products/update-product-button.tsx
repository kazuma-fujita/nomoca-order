import { Edit } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { Product } from 'API';
import { InputDialog } from 'components/atoms/dialogs/input-dialog';
import { useUpdateProduct } from 'hooks/products/use-update-product';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useToggle } from 'react-use';
import { ProductNameTextField } from 'components/atoms/text-fields/product-name-text-field';

type Props = {
  id: string;
  name: string;
  disabled: boolean;
};

export const UpdateProductButton = (props: Props) => {
  const useFormReturn = useForm<Product>();
  const { handleSubmit, reset: resetForm, clearErrors } = useFormReturn;
  const { updateProduct, isLoading, error, resetState } = useUpdateProduct();
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
          await updateProduct({ id: props.id, name: data.name, disabled: props.disabled });
          clearErrors();
          toggle();
        } catch (error) {}
      },
      [clearErrors, props.disabled, props.id, toggle, updateProduct],
    ),
  );

  const submitButtonLabel = '編集する';
  const label = `商品を${submitButtonLabel}`;

  return (
    <>
      <Button onClick={toggle} variant='outlined' startIcon={<Edit fontSize='small' />}>
        {label}
      </Button>
      <InputDialog
        dialogTitle={label}
        submitButtonLabel={submitButtonLabel}
        startIcon={<Edit />}
        on={on}
        isLoading={isLoading}
        error={error}
        submitHandler={submitHandler}
        cancelHandler={cancelHandler}
      >
        <ProductNameTextField {...useFormReturn} disabled={isLoading} name={props.name} />
      </InputDialog>
    </>
  );
};
