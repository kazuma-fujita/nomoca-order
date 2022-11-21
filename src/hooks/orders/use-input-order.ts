import { OrderType, Product } from 'API';
import { FormScreenQuery } from 'constants/form-screen-query';
import { Path } from 'constants/path';
import { useFetchProductList } from 'hooks/products/use-fetch-product-list';
import { NormalizedProduct } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { OrderFormParam, useOrderFormParam } from 'stores/use-order-form-param';

// 注文・定期便作成、定期便更新ボタン押下時処理
export const useUpsertOrderButton = (id?: string, products?: NormalizedProduct[], staffID?: string) => {
  const router = useRouter();
  const { mutate, orderType } = useOrderFormParam();
  // /single-order or /subscription-order 遷移先URL振り分け
  const basePath = orderType === OrderType.singleOrder ? Path.singleOrder : Path.subscriptionOrder;
  // 一覧右上に表示する注文・定期便作成ボタン、一覧上に表示する定期便更新ラベル
  const buttonLabel = id ? '変更する' : orderType === OrderType.singleOrder ? '商品を注文する' : '定期便を申し込む';
  // 入力フォーム初期値
  const defaultValues: OrderFormParam = useMemo(
    () => ({
      id: id ?? '',
      products: products ?? [
        { relationID: '', productID: '', name: '', purchasePrice: 0, unitPrice: 0, quantity: 1, isExportCSV: true },
      ],
      deleteProducts: products ?? [],
      staffID: staffID ?? '',
    }),
    [id, products, staffID],
  );

  // ボタン押下時入力フォームへ遷移
  const onButtonClick = useCallback(() => {
    mutate(defaultValues, false);
    // 以下各画面遷移時に shallow=true を指定すると画面リロードが走らず、SPAの挙動となる
    // order-template.tsx のuseRouterで変更後のクエリを取得、コンポーネントを切り替える
    router.push(`${basePath}?${FormScreenQuery.input}`, undefined, { shallow: true });
  }, [basePath, defaultValues, mutate, router]);

  return { buttonLabel, onButtonClick };
};

export const useInputOrder = () => {
  const router = useRouter();
  const { data: defaultValues, mutate, orderType } = useOrderFormParam();
  const basePath = orderType === OrderType.singleOrder ? Path.singleOrder : Path.subscriptionOrder;

  const formReturn = useForm<OrderFormParam>({ defaultValues: defaultValues ?? {} });
  const { handleSubmit, control } = formReturn;
  const fieldArrayReturn = useFieldArray({ control, name: 'products' });

  // URL直叩き対応。入力フォームの初期値が無ければ一覧画面へ遷移
  useEffect(() => {
    if (!defaultValues) {
      router.push(basePath);
    }
  }, [basePath, defaultValues, router]);

  const cancelHandler = useCallback(() => {
    mutate(undefined, false);
    // 以下各画面遷移時に shallow=true を指定すると画面リロードが走らず、SPAの挙動となる
    // order-template.tsx のuseRouterで変更後のクエリを取得、コンポーネントを切り替える
    router.push(basePath, undefined, { shallow: true });
  }, [mutate, router, basePath]);

  const { data: productList } = useFetchProductList();

  // 確認するボタン押下時処理
  const submitHandler = handleSubmit(
    useCallback(
      (formParam: OrderFormParam) => {
        if (!formParam.products || !productList || !productList.length) {
          throw Error('Input form values are not found.');
        }
        // 入力された商品配列データをviewOrder順に並び替え、重複商品はquantityを合計してmergeし重複削除。
        const mergedProducts = mergeOrderFormProductList(formParam.products, productList);
        // 確認画面に表示する為Stateに保存。確認画面から修正するボタン押下時も入力画面にmerge済み商品を表示する為、このタイミングで重複商品mergeを実行する
        mutate({ ...formParam, products: mergedProducts }, false);
        router.push(`${basePath}?${FormScreenQuery.confirm}`, undefined, { shallow: true });
      },
      [productList, mutate, router, basePath],
    ),
  );

  return { formReturn, fieldArrayReturn, submitHandler, cancelHandler };
};

const mergeOrderFormProductList = (
  baseProducts: NormalizedProduct[],
  masterProducts: Product[],
): NormalizedProduct[] => {
  // DBに登録されているproductマスターデータから必要な商品情報を取得
  const normalizedProducts: NormalizedProduct[] = baseProducts.map((item) => {
    const product = masterProducts.find((product) => product.id === item.productID);
    if (!product) {
      throw Error('A product master is not found.');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, orderType: _1, type: _2, disabled: _3, createdAt: _4, updatedAt: _5, ...rest } = product;
    return {
      relationID: id,
      productID: id,
      quantity: item.quantity,
      ...rest,
    };
    // return {
    //   relationID: product.id,
    //   productID: product.id,
    //   name: product.name,
    //   purchasePrice: product.purchasePrice,
    //   unitPrice: product.unitPrice,
    //   quantity: item.quantity,
    //   viewOrder: product.viewOrder,
    //   isExportCSV: product.isExportCSV,
    // };
  });

  // DBに登録されているproductマスターデータのviewOrder昇順でsort
  const sortedProducts = normalizedProducts.sort((a, b) => {
    if (!a.viewOrder || !b.viewOrder) {
      throw Error('No view order found to compare.');
    }
    return a.viewOrder > b.viewOrder ? 1 : -1;
  });

  // 入力画面で同じ商品が複数選択されてる場合、個数を合算してlistをmerge
  const mergedProducts = sortedProducts.reduce(
    (results: NormalizedProduct[], current: NormalizedProduct, currentIndex: number) => {
      const prev = results.find((item) => {
        if (!item.viewOrder || !current.viewOrder) {
          throw Error('No view order found to compare.');
        }
        return item.viewOrder === current.viewOrder;
      });
      if (currentIndex > 0 && prev) {
        const total = { ...prev, quantity: prev.quantity + current.quantity };
        return results.map((item) => {
          if (!item.viewOrder || !current.viewOrder) {
            throw Error('No view order found to compare.');
          }
          return item.viewOrder === current.viewOrder ? total : item;
        });
      } else {
        return [...results, current];
      }
    },
    [],
  );
  return mergedProducts;
};
