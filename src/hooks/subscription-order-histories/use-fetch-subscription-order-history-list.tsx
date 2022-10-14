import { GraphQLResult } from '@aws-amplify/api';
import {
  Clinic,
  DeliveryStatus,
  ListClinicsQuery,
  ListClinicsQueryVariables,
  ListSubscriptionOrderHistoriesSortedByCreatedAtQuery,
  ListSubscriptionOrderHistoriesSortedByCreatedAtQueryVariables,
  ModelOrderFilterInput,
  ModelSortDirection,
  SubscriptionOrderHistory,
  Type,
} from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { SWRKey } from 'constants/swr-key';
import { listClinics, listSubscriptionOrderHistoriesSortedByCreatedAt } from 'graphql/queries';
import { SearchParam, useSearchParam } from 'hooks/admins/use-search-param';
import { ExtendedOrder, NormalizedProduct } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { FetchResponse, useFetch } from 'hooks/swr/use-fetch';
import { createContext, useContext } from 'react';
import { useCurrentUser } from 'stores/use-current-user';

const generateNormalizedProducts = (order: SubscriptionOrderHistory): NormalizedProduct[] => {
  if (!order.products) {
    throw Error('Order products are null.');
  }

  return order.products.items.map((orderProduct) => {
    if (!orderProduct) {
      throw Error('An order product relation is null.');
    }
    return {
      relationID: orderProduct.id,
      productID: orderProduct.orderID,
      name: orderProduct.name,
      purchasePrice: orderProduct.purchasePrice,
      unitPrice: orderProduct.unitPrice,
      quantity: orderProduct.quantity,
      isExportCSV: orderProduct.isExportCSV,
    } as NormalizedProduct;
  });
};

const fetchClinicIDsByPhoneNumber = async (phoneNumber: string) => {
  if (!phoneNumber) {
    return [];
  }
  if (phoneNumber) {
    const variables: ListClinicsQueryVariables = { filter: { phoneNumber: { eq: phoneNumber } } };
    const result = (await API.graphql(graphqlOperation(listClinics, variables))) as GraphQLResult<ListClinicsQuery>;
    if (!result.data || !result.data.listClinics || !result.data.listClinics.items) {
      throw Error('The API fetched clinics data but it returned null.');
    }
    const clinics = result.data.listClinics.items as Clinic[];
    return clinics.map((clinic) => clinic.id);
  }
};

const generateFetingFilter = async (deliveryStatus: DeliveryStatus, phoneNumber: string) => {
  const deliveryStatusFilter =
    deliveryStatus !== DeliveryStatus.none ? { deliveryStatus: { eq: deliveryStatus } } : null;

  const clinicIDs = await fetchClinicIDsByPhoneNumber(phoneNumber);
  const clinicIDsFilter =
    clinicIDs && clinicIDs.length > 0
      ? {
          or: clinicIDs.map((id) => {
            return {
              clinicID: {
                eq: id,
              },
            };
          }),
        }
      : null;

  let filter: ModelOrderFilterInput | null = null;
  if (deliveryStatusFilter && clinicIDsFilter) {
    filter = { and: [deliveryStatusFilter, clinicIDsFilter] };
  } else if (deliveryStatusFilter) {
    filter = deliveryStatusFilter;
  } else if (clinicIDsFilter) {
    filter = clinicIDsFilter;
  }

  return filter;
};

const fetcher = async (
  _: string,
  isOperator: boolean,
  searchState: SearchParam,
): Promise<ExtendedOrder<SubscriptionOrderHistory>[]> => {
  // schema.graphqlのKeyディレクティブでtypeとcreatedAtのsort条件を追加。sortを実行する為にtypeを指定。
  const sortVariables: ListSubscriptionOrderHistoriesSortedByCreatedAtQueryVariables = {
    type: Type.subscriptionOrderHistory,
    sortDirection: ModelSortDirection.DESC,
  };

  // const filter = isOperator ? await generateFetingFilter(searchState.deliveryStatus, searchState.phoneNumber) : null;
  // console.log('filter', filter);
  // console.table(filter);

  // admin権限かつ検索条件が全件検索以外はfilter指定をしてAPI実行
  // const variables = filter ? { ...sortVariables, filter: filter } : sortVariables;

  const result = (await API.graphql(
    graphqlOperation(listSubscriptionOrderHistoriesSortedByCreatedAt, sortVariables),
    // graphqlOperation(listSubscriptionOrderHistoriesSortedByCreatedAt, variables),
  )) as GraphQLResult<ListSubscriptionOrderHistoriesSortedByCreatedAtQuery>;

  if (
    !result.data ||
    !result.data.listSubscriptionOrderHistoriesSortedByCreatedAt ||
    !result.data.listSubscriptionOrderHistoriesSortedByCreatedAt.items
  ) {
    throw Error('An API returned null.');
  }

  const items = result.data.listSubscriptionOrderHistoriesSortedByCreatedAt.items as SubscriptionOrderHistory[];

  for (const item of items) {
    if (!item || !item.products || !item.products.items) {
      throw Error('The API fetched product data but it returned null.');
    }
    for (const orderProduct of item.products.items) {
      if (!orderProduct) {
        throw Error('The API fetched order product data but it returned null.');
      }
    }
  }

  const extendedItems: ExtendedOrder<SubscriptionOrderHistory>[] = items.map((item) => ({
    ...item,
    normalizedProducts: generateNormalizedProducts(item),
  }));

  return extendedItems;
};

const SubscriptionOrderHistoryListContext = createContext({} as ProviderProps);

export const useFetchSubscriptionOrderHistoryList = () => useContext(SubscriptionOrderHistoryListContext);

// storybook用mock param
type Props = {
  mockResponse?: FetchResponse<ExtendedOrder<SubscriptionOrderHistory>[]>;
};

type ProviderProps = FetchResponse<ExtendedOrder<SubscriptionOrderHistory>[]> & {
  swrKey: (string | boolean | SearchParam)[];
};

export const SubscriptionOrderHistoryListContextProvider: React.FC<Props> = ({ mockResponse, children }) => {
  // adminユーザのみ検索をかける為、ログインユーザ権限取得
  const { isOperator } = useCurrentUser();
  // グローバルに保存された注文検索条件(admin管理画面用)
  const { searchState } = useSearchParam();
  console.log('search State', searchState);
  // 検索条件もSWRキャッシュの対象
  const swrKey = [SWRKey.subscriptionOrderHistoryList, isOperator, searchState];
  const fetchResponse = useFetch<ExtendedOrder<SubscriptionOrderHistory>[]>(swrKey, fetcher, {}, mockResponse);
  return (
    <SubscriptionOrderHistoryListContext.Provider value={{ ...fetchResponse, swrKey }}>
      {children}
    </SubscriptionOrderHistoryListContext.Provider>
  );
};
