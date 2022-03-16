import Edit from '@mui/icons-material/Edit';
import { Product } from 'API';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useToggle } from 'react-use';
import { useUpsertProduct } from './use-upsert-product';

export const useUpsertProductButton = (product?: Product) => {
  const defaultValues = {
    defaultValues: {
      name: product ? product.name : '',
      unitPrice: product ? product.unitPrice : 0,
      isExportCSV: product ? product.isExportCSV : false,
      disabled: product ? product.disabled : false,
    },
  };
  const useFormReturn = useForm<Product>(defaultValues);
  const { handleSubmit, reset: resetForm, clearErrors } = useFormReturn;
  const { upsertProduct, isLoading, error, resetState } = useUpsertProduct();
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
          await upsertProduct(product ? { ...data, id: product.id } : data);
          clearErrors();
          toggle();
        } catch (error) {}
      },
      [clearErrors, product, toggle, upsertProduct],
    ),
  );

  const submitButtonLabel = product ? '編集する' : '追加する';
  const dialogTitle = `商品を${submitButtonLabel}`;
  return { useFormReturn, submitButtonLabel, dialogTitle, on, toggle, isLoading, error, submitHandler, cancelHandler };
};
