import { Edit } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { NormalizedProduct } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { OrderFormParam, useOrderFormParam } from 'stores/use-order-form-param';

type Props = {
  id: string;
  products: NormalizedProduct[];
  staffID: string;
};

export const UpdateSubscriptionOrderButton = ({ id, products, staffID }: Props) => {
  // 入力フォーム初期値
  const defaultValues: OrderFormParam = useMemo(
    () => ({
      id: id,
      products: products,
      deleteProducts: products,
      staffID: staffID,
    }),
    [id, products, staffID],
  );

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

// type Props = {
//   id: string;
//   products: ModelSubscriptionOrderProductConnection;
//   staffID: string;
// };

// export const UpdateSubscriptionOrderButton = (props: Props) => {
//   // 入力フォーム初期値
//   const defaultValues = useMemo(
//     () => ({
//       products: props.products,
//       staffID: props.staffID,
//     }),
//     [props.products, props.staffID],
//   );
//   const useFormReturn = useForm<SubscriptionOrder>();
//   const { handleSubmit, reset: resetForm, control } = useFormReturn;
//   const useFieldArrayReturn = useFieldArray({ control, name: 'products.items' });
//   const { updateSubscriptionOrder, isLoading, error, resetState } = useUpdateSubscriptionOrder();
//   const [on, toggle] = useToggle(false);

//   useEffect(() => {
//     // useForm引数のdefaultValueだとプルダウンの初期値がセットされない為、
//     // useEffectで画面描写後に初期値をセット
//     resetForm(defaultValues);
//   }, [defaultValues, resetForm]);

//   const cancelHandler = useCallback(() => {
//     resetState();
//     toggle();
//   }, [resetState, toggle]);

//   // submit時処理handler。useCallbackの第2引数には一覧画面から渡されたpropsを指定
//   const submitHandler = handleSubmit(
//     useCallback(
//       async (data: SubscriptionOrder) => {
//         // productsデータ更新はproducts全件削除後、新規追加を行う。
//         // その為、第2引数にはproductsを新規登録する為入力フォームの値、第3引数にはproductsを全件削除する為一覧画面からの渡されたpropsの値を設定
//         try {
//           await updateSubscriptionOrder(props.id, data.products, props.products, data);
//           cancelHandler();
//         } catch (error) {}
//       },
//       [cancelHandler, props.id, props.products, updateSubscriptionOrder],
//     ),
//   );

//   const label = '変更する';
//   return (
//     <>
//       <Button onClick={toggle} variant='outlined' startIcon={<Edit fontSize='small' />} size='small'>
//         {label}
//       </Button>
//       <InputSubscriptionOrderDialog
//         label={label}
//         startIcon={<Edit />}
//         on={on}
//         isLoading={isLoading}
//         error={error}
//         submitHandler={submitHandler}
//         cancelHandler={cancelHandler}
//         formReturn={useFormReturn}
//         fieldArrayReturn={useFieldArrayReturn}
//         // productList={productList}
//         // staffList={staffList}
//         staffID={props.staffID}
//       />
//     </>
//   );
// };
