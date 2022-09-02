import { Product } from 'API';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useToggle } from 'react-use';
import { useUpsertProduct } from './use-upsert-product';

export const useUpsertProductForm = (product?: Product) => {
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
    resetState();
    toggle();
  }, [clearErrors, resetState, toggle]);

  const submitHandler = handleSubmit(
    useCallback(
      async (param: Product) => {
        try {
          await upsertProduct(param);
          cancelHandler();
          // 新規登録時はreact-hook-formで保持しているformのcacheをクリア
          if (!product) {
            resetForm();
          }
        } catch (error) {}
      },
      [cancelHandler, product, resetForm, upsertProduct],
    ),
  );

  const submitButtonLabel = product ? '編集する' : '追加する';
  const dialogTitle = `商品を${submitButtonLabel}`;
  return { useFormReturn, submitButtonLabel, dialogTitle, on, toggle, isLoading, error, submitHandler, cancelHandler };
};
