import { OrderType } from 'API';
import { UpdateOrderProps } from 'components/organisms/subscription-orders/update-subscription-order-button';
import { FormScreenQuery } from 'constants/form-screen-query';
import { Path } from 'constants/path';
import { mergeOrderFormProductList } from 'functions/orders/merge-order-form-product-list';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { OrderFormParam, useOrderFormParam } from 'stores/use-order-form-param';
import { useProductList } from 'stores/use-product-list';

const defaultValues: OrderFormParam = {
  products: [{ relationID: '', productID: '', name: '', unitPrice: 0, quantity: 1 }],
  staffID: '',
};

export const useUpdateOrderButton = ({ id, products, staffID }: UpdateOrderProps) => {
  const router = useRouter();
  const { mutate, orderType } = useOrderFormParam();
  const basePath = orderType === OrderType.singleOrder ? Path.singleOrder : Path.subscriptionOrder;
  const buttonLabel = '商品を変更する';
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

  const onButtonClick = useCallback(() => {
    mutate(defaultValues, false);
    router.push(`${basePath}?${FormScreenQuery.input}`, undefined, { shallow: true });
  }, [basePath, defaultValues, mutate, router]);

  // 注文する、申し込むボタン押下時処理
  return { buttonLabel, onButtonClick };
};

export const useCreateOrderButton = () => {
  const router = useRouter();
  const { mutate, orderType } = useOrderFormParam();
  const basePath = orderType === OrderType.singleOrder ? Path.singleOrder : Path.subscriptionOrder;
  const buttonLabel = orderType === OrderType.singleOrder ? '商品を注文する' : '定期便を申し込む';

  // 注文する、申し込むボタン押下時処理
  const onButtonClick = useCallback(() => {
    // useOrderFormで入力フォーム初期値が無ければ一覧画面に遷移させる為、このタイミングでStateを保存
    mutate(defaultValues, false);
    router.push(`${basePath}?${FormScreenQuery.input}`, undefined, { shallow: true });
  }, [basePath, mutate, router]);
  return { buttonLabel, onButtonClick };
};

export const useOrderForm = () => {
  const router = useRouter();
  const { data, mutate, orderType } = useOrderFormParam();
  const { data: productList } = useProductList();
  const basePath = orderType === OrderType.singleOrder ? Path.singleOrder : Path.subscriptionOrder;

  if (!data || !productList) {
    router.push(basePath);
  }

  const formReturn = useForm<OrderFormParam>({ defaultValues: data! });
  const { handleSubmit, control } = formReturn;
  const fieldArrayReturn = useFieldArray({ control, name: 'products' });

  const cancelHandler = useCallback(() => {
    mutate(undefined, false);
    router.push(basePath, undefined, { shallow: true });
  }, [mutate, router, basePath]);

  const submitHandler = handleSubmit(
    useCallback(
      (data: OrderFormParam) => {
        // 入力された商品配列データをviewOrder順に並び替え、重複商品はquantityを合計してmergeし重複削除。
        const mergedProducts = mergeOrderFormProductList(data.products!, productList!);
        // 確認画面に表示する為Stateに保存。確認画面から修正するボタン押下時も入力画面にmerge済み商品を表示する為、このタイミングで重複商品mergeを実行する
        mutate({ ...data, products: mergedProducts }, false);
        router.push(`${basePath}?${FormScreenQuery.confirm}`, undefined, { shallow: true });
      },
      [productList, mutate, router, basePath],
    ),
  );

  return { formReturn, fieldArrayReturn, submitHandler, cancelHandler };
};
