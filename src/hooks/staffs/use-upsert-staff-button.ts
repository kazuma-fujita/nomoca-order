import { Staff } from 'API';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useToggle } from 'react-use';
import { useUpsertStaff } from './use-upsert-staff';

export const useUpsertStaffButton = (staff?: Staff) => {
  const defaultValues = {
    defaultValues: {
      name: staff ? staff.name : '',
      disabled: staff ? staff.disabled : false,
    },
  };
  const useFormReturn = useForm<Staff>(defaultValues);
  const { handleSubmit, reset: resetForm, clearErrors } = useFormReturn;
  const { upsertStaff, isLoading, error, resetState } = useUpsertStaff();
  const [on, toggle] = useToggle(false);

  const cancelHandler = useCallback(() => {
    clearErrors();
    resetForm();
    resetState();
    toggle();
  }, [clearErrors, resetForm, resetState, toggle]);

  const submitHandler = handleSubmit(
    useCallback(
      async (data: Staff) => {
        try {
          await upsertStaff(staff ? { ...data, id: staff.id } : data);
          cancelHandler();
        } catch (error) {}
      },
      [cancelHandler, staff, upsertStaff],
    ),
  );

  const submitButtonLabel = staff ? '編集する' : '追加する';
  const dialogTitle = `担当者を${submitButtonLabel}`;
  return { useFormReturn, submitButtonLabel, dialogTitle, on, toggle, isLoading, error, submitHandler, cancelHandler };
};
