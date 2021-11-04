import { Edit } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { Product } from 'API';
import { useUpdateProduct } from 'hooks/products/use-update-product';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useToggle } from 'react-use';
import { InputProductDialog } from './input-product-dialog';

type Props = {
  id: string;
  name: string;
  disabled: boolean;
};

export const UpdateProductButton = (props: Props) => {
  // const useFormReturn = useForm<Product>({ defaultValues: { name: props.name } });
  const useFormReturn = useForm<Product>();
  const { handleSubmit, reset: resetForm, clearErrors } = useFormReturn;
  const { updateProduct, isLoading, error, resetState } = useUpdateProduct();
  const [on, toggle] = useToggle(false);
  // useEffect(() => {
  //   resetForm({ name: props.name });
  // }, []);
  const submitHandler = handleSubmit(
    useCallback(
      async (data: Product) => {
        await updateProduct({ id: props.id, name: data.name, disabled: props.disabled });
        if (!error) {
          // cancelHandler();
          clearErrors();
          toggle();
        }
      },
      [props.disabled]
    )
  );
  const cancelHandler = useCallback(() => {
    resetForm();
    resetState();
    toggle();
  }, []);
  const label = '編集';
  return (
    <>
      <Button onClick={toggle} variant='outlined' startIcon={<Edit fontSize='small' />}>
        {label}
      </Button>
      <InputProductDialog
        label={label}
        startIcon={<Edit />}
        on={on}
        isLoading={isLoading}
        error={error}
        submitHandler={submitHandler}
        cancelHandler={cancelHandler}
        useFormReturn={useFormReturn}
        name={props.name}
      />
    </>
  );
};
