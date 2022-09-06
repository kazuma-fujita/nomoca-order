import { Staff } from 'API';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useToggle } from 'react-use';
import { useUpsertStaff } from './use-upsert-staff';

export const useUpsertStaffForm = (staff?: Staff) => {
  const defaultValues = {
    defaultValues: {
      id: staff ? staff.id : '',
      firstName: staff ? staff.firstName : '',
      lastName: staff ? staff.lastName : '',
      disabled: staff ? staff.disabled : false,
    },
  };
  const useFormReturn = useForm<Staff>(defaultValues);
  const { handleSubmit, reset: resetForm, clearErrors } = useFormReturn;
  const { upsertStaff, isLoading, error, resetState } = useUpsertStaff();
  const [on, toggle] = useToggle(false);

  const cancelHandler = useCallback(() => {
    clearErrors();
    resetState();
    toggle();
  }, [clearErrors, resetState, toggle]);

  const submitHandler = handleSubmit(
    useCallback(
      async (param: Staff) => {
        try {
          await upsertStaff(param);
          cancelHandler();
          // 新規登録時はreact-hook-formで保持しているformのcacheをクリア
          if (!staff) {
            resetForm();
          }
        } catch (error) {}
      },
      [cancelHandler, resetForm, staff, upsertStaff],
    ),
  );

  const submitButtonLabel = staff ? '編集する' : '追加する';
  const dialogTitle = `発注担当者を${submitButtonLabel}`;
  return { useFormReturn, submitButtonLabel, dialogTitle, on, toggle, isLoading, error, submitHandler, cancelHandler };
};
