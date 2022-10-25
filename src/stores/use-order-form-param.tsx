import { FetchResponse, useFetch } from 'hooks/swr/use-fetch';
import { createContext, useContext } from 'react';
import { DeliveryType, OrderType } from 'API';
import { SWRKey } from 'constants/swr-key';
import { NormalizedProduct } from 'hooks/subscription-orders/use-fetch-subscription-order-list';

// TODO: will change non-null field
export type OrderFormParam = {
  id?: string | null;
  clinicID?: string | null;
  staffID?: string | null;
  products?: NormalizedProduct[] | null;
  deleteProducts?: NormalizedProduct[] | null;
  deliveryType?: DeliveryType | null;
  deliveryStartYear?: number | null;
  deliveryStartMonth?: number | null;
  deliveryInterval?: number | null;
  note?: string | null;
};

type ProviderProps = FetchResponse<OrderFormParam> & {
  orderType: OrderType;
};

const OrderFormParamContext = createContext({} as ProviderProps);

export const useOrderFormParam = () => useContext(OrderFormParamContext);

type Props = {
  orderType: OrderType;
  initialOrderFormParam?: OrderFormParam | null; // Storybook表示用
};

export const OrderFormParamContextProvider: React.FC<Props> = ({ orderType, initialOrderFormParam, ...rest }) => {
  const response = useFetch<OrderFormParam>(SWRKey.orderFormParam, null);
  // storybook表示用に初期値があれば設定
  const result = initialOrderFormParam ? { ...response, data: initialOrderFormParam } : response;
  return <OrderFormParamContext.Provider value={{ ...result, orderType }} {...rest} />;
};
