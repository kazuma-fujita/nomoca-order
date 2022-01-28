import { Edit } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { ModelOrderProductConnection, Order } from 'API';
import { useUpdateOrder } from 'hooks/orders/use-update-order';
import { useCallback, useEffect, useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useToggle } from 'react-use';
import { InputSingleOrderDialog } from './input-single-order-dialog';

type Props = {
  id: string;
  products: ModelOrderProductConnection;
  staffID: string;
};

export const UpdateSingleOrderButton = (props: Props) => {
  // 入力フォーム初期値
  const defaultValues = useMemo(
    () => ({
      products: props.products,
      staffID: props.staffID,
    }),
    [props.products, props.staffID],
  );
  const useFormReturn = useForm<Order>();
  const { handleSubmit, reset: resetForm, control } = useFormReturn;
  const useFieldArrayReturn = useFieldArray({ control, name: 'products.items' });
  const { updateOrder, isLoading, error, resetState } = useUpdateOrder();
  const [on, toggle] = useToggle(false);

  useEffect(() => {
    // useForm引数のdefaultValueだとプルダウンの初期値がセットされない為、
    // useEffectで画面描写後に初期値をセット
    resetForm(defaultValues);
  }, [defaultValues, resetForm]);

  const cancelHandler = useCallback(() => {
    resetState();
    toggle();
  }, [resetState, toggle]);

  // submit時処理handler。useCallbackの第2引数には一覧画面から渡されたpropsを指定
  const submitHandler = handleSubmit(
    useCallback(
      async (data: Order) => {
        // productsデータ更新はproducts全件削除後、新規追加を行う。
        // その為、第2引数にはproductsを新規登録する為入力フォームの値、第3引数にはproductsを全件削除する為一覧画面からの渡されたpropsの値を設定
        try {
          await updateOrder(props.id, data.products, props.products, data);
          cancelHandler();
        } catch (error) {}
      },
      [cancelHandler, props.id, props.products, updateOrder],
    ),
  );

  const label = '変更する';
  return (
    <>
      <Button onClick={toggle} variant='outlined' startIcon={<Edit fontSize='small' />} size='small'>
        {label}
      </Button>
      <InputSingleOrderDialog
        label={label}
        startIcon={<Edit />}
        on={on}
        isLoading={isLoading}
        error={error}
        submitHandler={submitHandler}
        cancelHandler={cancelHandler}
        formReturn={useFormReturn}
        fieldArrayReturn={useFieldArrayReturn}
        // productList={productList}
        // staffList={staffList}
        staffID={props.staffID}
      />
    </>
  );
};
