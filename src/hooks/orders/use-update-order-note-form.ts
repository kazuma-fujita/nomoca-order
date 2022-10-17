import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useToggle } from 'react-use';
import { OrderFormParam, useOrderFormParam } from 'stores/use-order-form-param';
import { useUpdateOrderNote } from './use-update-order-note';

export const useUpsertOrderNoteForm = (id: string, note?: string | null) => {
  const defaultValues = {
    defaultValues: {
      id: id,
      note: note,
    },
  };
  const useFormReturn = useForm<OrderFormParam>(defaultValues);
  const { orderType } = useOrderFormParam();
  const { handleSubmit, clearErrors } = useFormReturn;
  const { updateOrderNote, isLoading, error, resetState } = useUpdateOrderNote();
  const [on, toggle] = useToggle(false);

  const cancelHandler = useCallback(() => {
    clearErrors();
    resetState();
    toggle();
  }, [clearErrors, resetState, toggle]);

  const submitHandler = handleSubmit(
    useCallback(
      async (param: OrderFormParam) => {
        try {
          await updateOrderNote(orderType, param);
          cancelHandler();
        } catch (error) {}
      },
      [cancelHandler, orderType, updateOrderNote],
    ),
  );

  return { useFormReturn, on, toggle, isLoading, error, submitHandler, cancelHandler };
};
