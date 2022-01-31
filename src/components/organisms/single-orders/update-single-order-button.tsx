import { Edit } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { ModelOrderProductConnection, Order } from 'API';
import { useUpdateOrder } from 'hooks/orders/use-update-order';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useToggle } from 'react-use';
// import { InputSingleOrderDialog } from './input-single-order/input-single-order';
import { OrderFormParam, ProductRelation, useOrderFormParam } from 'stores/use-order-form-param';

type Props = {
  id: string;
  products: ModelOrderProductConnection;
  staffID: string;
};

export const UpdateSingleOrderButton = ({ id, products, staffID }: Props) => {
  const productRelation: ProductRelation[] = products.items.map((item) => ({
    relationID: item?.id,
    productID: item?.productID,
    quantity: item?.quantity,
  }));

  // 入力フォーム初期値
  const defaultValues: OrderFormParam = useMemo(
    () => ({
      id: id,
      // TODO: Refactoring
      products: productRelation,
      deleteProducts: productRelation,
      staffID: staffID,
    }),
    [id, productRelation, staffID],
  );
  // const useFormReturn = useForm<OrderFormParam>();
  // const { reset: resetForm, control } = useFormReturn;
  // const useFieldArrayReturn = useFieldArray({ control, name: 'products' });
  // const { updateOrder, isLoading, error, resetState } = useUpdateOrder();
  // const [on, toggle] = useToggle(false);

  // useEffect(() => {
  //   // useForm引数のdefaultValueだとプルダウンの初期値がセットされない為、
  //   // useEffectで画面描写後に初期値をセット
  //   // resetForm(defaultValues);
  // }, [defaultValues, resetForm]);

  // const cancelHandler = useCallback(() => {
  //   resetState();
  //   toggle();
  // }, [resetState, toggle]);

  // submit時処理handler。useCallbackの第2引数には一覧画面から渡されたpropsを指定
  // const submitHandler = handleSubmit(
  //   useCallback(
  //     async (data: OrderFormParam) => {
  //       // productsデータ更新はproducts全件削除後、新規追加を行う。
  //       // その為、第2引数にはproductsを新規登録する為入力フォームの値、第3引数にはproductsを全件削除する為一覧画面からの渡されたpropsの値を設定
  //       try {
  //         await updateOrder(id, data.products!, products, data);
  //         cancelHandler();
  //       } catch (error) {}
  //     },
  //     [cancelHandler, id, products, updateOrder],
  //   ),
  // );

  const router = useRouter();
  const { mutate } = useOrderFormParam();

  const onButtonClick = useCallback(() => {
    mutate(defaultValues, false);
    router.push('/single-order?screen=input', undefined, { shallow: true });
  }, [defaultValues, mutate, router]);

  return (
    <>
      <Button onClick={onButtonClick} variant='outlined' startIcon={<Edit fontSize='small' />} size='small'>
        変更する
      </Button>
    </>
  );
};
