import { GraphQLResult } from '@aws-amplify/api';
import {
  DeliveryStatus,
  ListOrdersSortedByCreatedAtQuery,
  ListOrdersSortedByCreatedAtQueryVariables,
  ModelSortDirection,
  Order,
  Type,
  ListClinicsQuery,
  ListClinicsQueryVariables,
  Clinic,
  ModelOrderFilterInput,
} from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { SWRKey } from 'constants/swr-key';
import { addDays, format } from 'date-fns';
import { listClinics, listOrdersSortedByCreatedAt } from 'graphql/queries';
import { SearchParam, useSearchParam } from 'hooks/admins/use-search-param';
import { ExtendedOrder, NormalizedProduct } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { FetchResponse, useFetch } from 'hooks/swr/use-fetch';
import { createContext, useContext } from 'react';
import { useCurrentUser } from 'stores/use-current-user';

const generateNormalizedProducts = (order: Order): NormalizedProduct[] => {
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

export const generateClinicIDsFilter = async (phoneNumber: string | null) => {
  if (!phoneNumber) {
    return null;
  }
  const clinicIDs = await fetchClinicIDsByPhoneNumber(phoneNumber);
  return clinicIDs && clinicIDs.length > 0
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
};

export const isValidDate = (dateString: string, formatString = 'yyyy-MM-dd'): boolean => {
  const regexp = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  if (!regexp.test(dateString)) {
    return false;
  }
  const date = new Date(dateString);
  try {
    const formatDate = format(date, formatString);
    return dateString === formatDate;
  } catch (error) {
    return false;
  }
};

export const formatSearchTerm = (fromDate: string | null, toDate: string | null): string[] => {
  const hms = 'T00:00:00.000Z';
  // デフォルト検索開始日は1900-01-01の0時
  let formattedFromDate = `1900-01-01${hms}`;
  // デフォルト検索終了日は翌日の0時
  let formattedToDate = `${format(addDays(new Date(), 1), 'yyyy-MM-dd')}${hms}`;
  if (fromDate) {
    formattedFromDate = `${fromDate}${hms}`;
  }
  if (toDate) {
    formattedToDate = `${format(addDays(new Date(toDate), 1), 'yyyy-MM-dd')}${hms}`;
  }
  return [formattedFromDate, formattedToDate];
};

export const generateSearchTermFilter = (
  fromDate: string | null,
  toDate: string | null,
): ModelOrderFilterInput | null => {
  if ((!fromDate && !toDate) || (fromDate && !isValidDate(fromDate)) || (toDate && !isValidDate(toDate))) {
    return null;
  }
  const [formattedFromDate, formattedToDate] = formatSearchTerm(fromDate, toDate);
  console.log('formattedFromDate', formattedFromDate);
  console.log('formattedToDate', formattedToDate);
  return { deliveredAt: { between: [formattedFromDate, formattedToDate] } };
};

const generateFetingFilter = async (searchState: SearchParam): Promise<ModelOrderFilterInput | null> => {
  const deliveryStatusFilter =
    searchState.deliveryStatus !== DeliveryStatus.none ? { deliveryStatus: { eq: searchState.deliveryStatus } } : null;

  const clinicIDsFilter = await generateClinicIDsFilter(searchState.phoneNumber);
  const searchTermFilter = generateSearchTermFilter(searchState.fromDate, searchState.toDate);

  const filters = [deliveryStatusFilter, clinicIDsFilter, searchTermFilter].filter((filter) => filter);
  if (filters.length === 0) {
    return null;
  } else if (filters.length === 1) {
    return filters[0];
  } else {
    return { and: filters };
  }
};

const fetcher = async (_: string, isOperator: boolean, searchState: SearchParam): Promise<ExtendedOrder<Order>[]> => {
  // schema.graphqlのKeyディレクティブでtypeとcreatedAtのsort条件を追加。sortを実行する為にtypeを指定。
  const sortVariables: ListOrdersSortedByCreatedAtQueryVariables = {
    type: Type.order,
    sortDirection: ModelSortDirection.DESC,
  };

  const filter = isOperator ? await generateFetingFilter(searchState) : null;
  console.log('filter', filter);
  console.table(filter);

  // admin権限かつ検索条件が全件検索以外はfilter指定をしてAPI実行
  const variables = filter ? { ...sortVariables, filter: filter } : sortVariables;

  const result = (await API.graphql(
    graphqlOperation(listOrdersSortedByCreatedAt, variables),
  )) as GraphQLResult<ListOrdersSortedByCreatedAtQuery>;

  if (!result.data || !result.data.listOrdersSortedByCreatedAt || !result.data.listOrdersSortedByCreatedAt.items) {
    throw Error('An API returned null.');
  }

  const items = result.data.listOrdersSortedByCreatedAt.items as Order[];

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

  const extendedItems: ExtendedOrder<Order>[] = items.map((item) => ({
    ...item,
    normalizedProducts: generateNormalizedProducts(item),
  }));

  return extendedItems;
};

const OrderListContext = createContext({} as ProviderProps);

export const useFetchSingleOrderList = () => useContext(OrderListContext);

// storybook用mock param
type Props = {
  mockResponse?: FetchResponse<ExtendedOrder<Order>[]>;
};

type ProviderProps = FetchResponse<ExtendedOrder<Order>[]> & {
  swrKey: (string | boolean | SearchParam)[];
  count: number;
};

export const OrderListContextProvider: React.FC<Props> = ({ mockResponse, children }) => {
  // adminユーザのみ検索をかける為、ログインユーザ権限取得
  const { isOperator } = useCurrentUser();
  // グローバルに保存された注文検索条件(admin管理画面用)
  const { searchState } = useSearchParam();
  console.log('search State', searchState);
  // 検索条件もSWRキャッシュの対象
  const swrKey = [SWRKey.orderList, isOperator, searchState];
  const fetchResponse = useFetch<ExtendedOrder<Order>[]>(swrKey, fetcher, {}, mockResponse);
  const count = fetchResponse.data ? fetchResponse.data.length : 0;
  return <OrderListContext.Provider value={{ ...fetchResponse, swrKey, count }}>{children}</OrderListContext.Provider>;
};
