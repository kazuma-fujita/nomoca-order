import { Edit } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { ModelSubscriptionOrderProductConnection, SubscriptionOrder } from 'API';
import { useUpdateSubscriptionOrder } from 'hooks/subscription-orders/use-update-subscription-order';
import { useCallback, useEffect, useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useToggle } from 'react-use';
import { InputSubscriptionOrderDialog } from './input-subscription-order-dialog';

type Props = {
  id: string;
  products: ModelSubscriptionOrderProductConnection;
  staffID: string;
};

export const UpdateSubscriptionOrderButton = (props: Props) => {
  // 入力フォーム初期値
  const defaultValues = useMemo(
    () => ({
      products: props.products,
      staffID: props.staffID,
    }),
    [props.products, props.staffID],
  );
  console.log('defaultValues:', defaultValues);
  const useFormReturn = useForm<SubscriptionOrder>();
  const { handleSubmit, reset: resetForm, control } = useFormReturn;
  const useFieldArrayReturn = useFieldArray({ control, name: 'products.items' });
  const { updateSubscriptionOrder, isLoading, error, resetState } = useUpdateSubscriptionOrder();
  const [on, toggle] = useToggle(false);

  useEffect(() => {
    // useForm引数のdefaultValueだとプルダウンの初期値がセットされない為、
    // useEffectで画面描写後に初期値をセット
    resetForm(defaultValues);
  }, [defaultValues, resetForm]);

  const cancelHandler = useCallback(() => {
    resetState();
    // resetForm();
    toggle();
  }, [resetState, toggle]);

  // submit時処理handler。useCallbackの第2引数には一覧画面から渡されたpropsを指定
  const submitHandler = handleSubmit(
    useCallback(
      async (data: SubscriptionOrder) => {
        console.log('data:', data);
        // productsデータ更新はproducts全件削除後、新規追加を行う。
        // その為、第2引数にはproductsを新規登録する為入力フォームの値、第3引数にはproductsを全件削除する為一覧画面からの渡されたpropsの値を設定
        const error = await updateSubscriptionOrder(props.id, data.products, props.products, data.staffID);
        if (!error) {
          cancelHandler();
          // resetForm();
          // clearErrors();
          // toggle();
        }
      },
      [cancelHandler, props.id, props.products, updateSubscriptionOrder],
    ),
  );

  const label = '変更する';
  return (
    <>
      <Button onClick={toggle} variant='outlined' startIcon={<Edit fontSize='small' />} size='small'>
        {label}
      </Button>
      <InputSubscriptionOrderDialog
        label={label}
        startIcon={<Edit />}
        on={on}
        isLoading={isLoading}
        error={error}
        submitHandler={submitHandler}
        cancelHandler={cancelHandler}
        useFormReturn={useFormReturn}
        useFieldArrayReturn={useFieldArrayReturn}
        // productList={productList}
        // staffList={staffList}
        staffID={props.staffID}
      />
    </>
  );
};
