import { GraphQLResult } from '@aws-amplify/api';
import { SubscriptionOrder } from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { SWRKey } from 'constants/swr-key';
import { FetchResponse, useFetch } from 'hooks/swr/use-fetch';
import { createContext, useContext } from 'react';
import { listSubscriptionOrdersContainedNextDeliveryDate } from 'graphql/queries';

export type NormalizedProduct = {
  relationID: string; // OrderProduct or SubscriptionOrderProduct の ID。定期便削除時はrelationIDでProductとのリレーションレコードであるSubscriptionOrderProductを削除
  productID: string; // use-hook-formで入力フォームにセットする商品ID。他、productのDBキャッシュからviewOrderなどの値を取得する為に使用
  name: string;
  purchasePrice: number; // 仕入れ値。CSVに出力する金額
  unitPrice: number; // 単価。売値。顧客が支払う金額
  quantity: number;
  isExportCSV: boolean; // useExportOrderCSV 内でisExportCSV=falseの場合、csv行に出力しない
  bCartDeliveryGroupId?: number | null; // CSVのBカート配送グループ列
  bCartSetId?: number | null; // CSVのBカートセットID列
  isBCartSeparateDeliveryRoute?: boolean | null; // trueの場合、CSV出力時に独自UUIDを発行しまとめコード列にセット
  viewOrder?: number | null; // 入力確認画面で商品を表示するソート順。useCreateOrderでは値をOrderProductに登録
};

export type ExtendedOrder<T> = T & {
  normalizedProducts: NormalizedProduct[];
};

const generateNormalizedProducts = (order: SubscriptionOrder): NormalizedProduct[] => {
  if (!order.products || !order.products.items) {
    throw Error('The API fetched products but it returned null.');
  }

  // viewOrder昇順でsort
  return order.products.items
    .sort((a, b) => {
      if (!a || !b) {
        throw Error('No view order found to compare.');
      }
      return a.product.viewOrder > b.product.viewOrder ? 1 : -1;
    })
    .map((orderProduct) => {
      if (!orderProduct) {
        throw Error('A subscription order product relation is null.');
      }
      const { id, productID, product, ...rest } = orderProduct;
      // SubscriptionOrderProductとProductの入れ子構造をflatなオブジェクトに詰め替える
      return {
        relationID: id,
        productID: productID,
        ...rest,
        ...product,
      };
      // return {
      //   relationID: orderProduct.id,
      //   productID: orderProduct.productID,
      //   name: orderProduct.product.name,
      //   purchasePrice: orderProduct.product.purchasePrice,
      //   unitPrice: orderProduct.product.unitPrice,
      //   quantity: orderProduct.quantity,
      //   isExportCSV: orderProduct.product.isExportCSV,
      //   isBCartSeparateDeliveryRoute: orderProduct.product.isBCartSeparateDeliveryRoute,
      // };
    });
};

const fetcher = async (): Promise<ExtendedOrder<SubscriptionOrder>[]> => {
  const result = (await API.graphql(
    graphqlOperation(listSubscriptionOrdersContainedNextDeliveryDate),
  )) as GraphQLResult<{
    listSubscriptionOrdersContainedNextDeliveryDate: [SubscriptionOrder];
  }>;

  if (!result.data) {
    throw Error('The API fetched data but it returned null.');
  }

  const items = result.data.listSubscriptionOrdersContainedNextDeliveryDate as SubscriptionOrder[];
  for (const item of items) {
    if (!item || !item.products || !item.products.items) {
      throw Error('The API fetched products but it returned null.');
    }
  }

  const extendedItems: ExtendedOrder<SubscriptionOrder>[] = items.map((item) => ({
    ...item,
    normalizedProducts: generateNormalizedProducts(item),
  }));

  return extendedItems;
};

const SubscriptionOrderListContext = createContext({} as SubscriptionOrderListProviderProps);

export const useFetchSubscriptionOrderList = () => useContext(SubscriptionOrderListContext);

type Props = {
  mockResponse?: FetchResponse<ExtendedOrder<SubscriptionOrder>[]>;
};

export type SubscriptionOrderListProviderProps = FetchResponse<ExtendedOrder<SubscriptionOrder>[]> & {
  count: number;
};

export const SubscriptionOrderListContextProvider: React.FC<Props> = ({ mockResponse, children }) => {
  const fetchResponse = useFetch<ExtendedOrder<SubscriptionOrder>[]>(
    SWRKey.subscriptionOrderList,
    fetcher,
    {},
    mockResponse,
  );
  const count = fetchResponse.data ? fetchResponse.data.length : 0;
  return (
    <SubscriptionOrderListContext.Provider value={{ ...fetchResponse, count }}>
      {children}
    </SubscriptionOrderListContext.Provider>
  );
};
