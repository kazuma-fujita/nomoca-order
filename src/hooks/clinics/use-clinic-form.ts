import { Clinic } from 'API';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import useToggle from 'react-use/lib/useToggle';
import { useFetchClinic } from './use-fetch-clinic';
import { useSearchAddress } from './use-search-address';
import { useUpsertClinic } from './use-upsert-clinic';

const POSTAL_CODE_LENGTH = 7;

export const useClinicForm = () => {
  const { data } = useFetchClinic();
  const { upsertClinic, isLoading, error, resetState } = useUpsertClinic();
  const { searchAddress } = useSearchAddress();
  const formReturn = useForm<Clinic>(data ? { defaultValues: data } : {});
  const { handleSubmit, reset: resetForm, clearErrors, setValue } = formReturn;
  const [on, toggle] = useToggle(false);

  const cancelHandler = useCallback(() => {
    clearErrors();
    resetForm();
    resetState();
    toggle();
  }, [clearErrors, resetForm, resetState, toggle]);

  const submitHandler = handleSubmit(
    useCallback(
      async (param: Clinic) => {
        try {
          await upsertClinic(data ? { ...param, id: data.id } : param);
          cancelHandler();
        } catch (error) {}
      },
      [cancelHandler, data, upsertClinic],
    ),
  );

  const handleOnChangePostalCode = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      // 郵便番号が7桁入力されたら郵便番号住所検索実行
      if (value.length === POSTAL_CODE_LENGTH) {
        const result = await searchAddress(value);
        if (result) {
          // formの値を上書き
          setValue('state', result.state);
          setValue('city', result.city);
          setValue('address', result.address);
          setValue('building', '');
        }
      }
    },
    [searchAddress, setValue],
  );

  const submitButtonLabel = data ? '編集する' : '作成する';
  const dialogTitle = `配送先を${submitButtonLabel}`;
  return {
    formReturn,
    submitButtonLabel,
    dialogTitle,
    on,
    toggle,
    data,
    isLoading,
    error,
    submitHandler,
    cancelHandler,
    handleOnChangePostalCode,
  };
};
