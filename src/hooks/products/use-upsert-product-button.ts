import Edit from '@mui/icons-material/Edit';
import { Product } from 'API';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useToggle } from 'react-use';
import { useUpsertProduct } from './use-upsert-product';

export const useUpsertProductButton = (product?: Product) => {
  const defaultValues = {
    defaultValues: {
      id: product ? product.id : '',
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
    clearErrors();
    resetForm();
    resetState();
    toggle();
  }, [clearErrors, resetForm, resetState, toggle]);

  const submitHandler = handleSubmit(
    useCallback(
      async (param: Product) => {
        try {
          // await upsertProduct(product ? { ...data, id: product.id } : data);
          await upsertProduct(param);
          cancelHandler();
        } catch (error) {}
      },
      // [cancelHandler, product, upsertProduct],
      [cancelHandler, upsertProduct],
    ),
  );

  const submitButtonLabel = product ? '編集する' : '追加する';
  const dialogTitle = `商品を${submitButtonLabel}`;
  return { useFormReturn, submitButtonLabel, dialogTitle, on, toggle, isLoading, error, submitHandler, cancelHandler };
};
