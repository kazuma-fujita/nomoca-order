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
  const defaultValues = {
    defaultValues: {
      id: data ? data.id : '',
      name: data ? data.name : '',
      postalCode: data ? data.postalCode : '',
      state: data ? data.state : '',
      city: data ? data.city : '',
      address: data ? data.address : '',
      building: data ? data.building : '',
      phoneNumber: data ? data.phoneNumber : '',
    },
  };
  const formReturn = useForm<Clinic>(defaultValues);
  const { handleSubmit, reset: resetForm, clearErrors, setValue } = formReturn;
  const { upsertClinic, isLoading, error, resetState } = useUpsertClinic();
  const { searchAddress } = useSearchAddress();
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
          await upsertClinic(param);
          // resetFormをcallすると配送先情報更新後の値が次回dialogを開いた時のformに反映されない。
          // その為、resetFormを含むcancelHandlerはcallしない。
          clearErrors();
          resetState();
          toggle();
        } catch (error) {}
      },
      [clearErrors, resetState, toggle, upsertClinic],
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
          if (result.state) {
            setValue('state', result.state);
          }
          if (result.city) {
            setValue('city', result.city);
          }
          // 番地は補完しない
          // if (result.address) {
          //   setValue('address', result.address);
          // }
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
