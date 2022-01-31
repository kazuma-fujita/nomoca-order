import { FetchResponse, useFetch } from 'hooks/swr/use-fetch';
import { createContext, useContext } from 'react';
import { DeliveryType, ModelOrderProductConnection, OrderType } from 'API';
import { SWRKey } from '../constants/swr-key';

// TODO: will change non-null field
export type ProductRelation = {
  relationID?: string | null;
  productID?: string | null;
  quantity?: number | null;
};

// TODO: will change non-null field
export type OrderFormParam = {
  id?: string | null;
  staffID?: string | null;
  products?: ProductRelation[] | null;
  deleteProducts?: ProductRelation[] | null;
  deliveryType?: DeliveryType | null;
  deliveryStartYear?: number | null;
  deliveryStartMonth?: number | null;
  deliveryInterval?: number | null;
};

type ProviderProps = FetchResponse<OrderFormParam> & {
  orderType: OrderType;
};

const OrderFormParamContext = createContext({} as ProviderProps);

export const useOrderFormParam = () => useContext(OrderFormParamContext);

type Props = {
  orderType: OrderType;
};

export const OrderFormParamContextProvider: React.FC<Props> = ({ orderType, ...rest }) => {
  const swrKey = SWRKey.orderFormParam;
  const response = useFetch<OrderFormParam>(swrKey, null);
  return <OrderFormParamContext.Provider value={{ ...response, orderType }} {...rest} />;
};
