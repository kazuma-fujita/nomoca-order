import { DeliveryStatus } from 'API';
import { SingleOrderSearchParam } from 'components/organisms/admins/single-orders/search-form/single-order-search-form';
import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

type ProviderProps = {
  searchState: SingleOrderSearchParam;
  setSearchState: Dispatch<SetStateAction<SingleOrderSearchParam>>;
};

const SubscriptionOrderHistorySearchParamContext = createContext({} as ProviderProps);

export const useSubscriptionOrderHistorySearchParam = () => useContext(SubscriptionOrderHistorySearchParamContext);

// admin画面の注文検索条件状態context
export const SubscriptionOrderHistorySearchParamContextProvider: React.FC = ({ children }) => {
  // useStateの初期値
  const initialState: SingleOrderSearchParam = {
    // 配送状況。デフォルト未発送
    deliveryStatus: DeliveryStatus.ordered,
    // clinic name, phoneNumber検索
    name: '',
    phoneNumber: '',
  };

  // グローバルに持つ検索条件
  const [searchState, setSearchState] = useState<SingleOrderSearchParam>(initialState);
  return (
    <SubscriptionOrderHistorySearchParamContext.Provider value={{ searchState, setSearchState }}>
      {children}
    </SubscriptionOrderHistorySearchParamContext.Provider>
  );
};
