import { DeliveryStatus } from 'API';
import { SingleOrderSearchParam } from 'components/organisms/admins/single-orders/search-form/single-order-search-form';
import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

type ProviderProps = {
  searchState: SingleOrderSearchParam;
  setSearchState: Dispatch<SetStateAction<SingleOrderSearchParam>>;
};

const SingleOrderSearchParamContext = createContext({} as ProviderProps);

export const useSingleOrderSearchParam = () => useContext(SingleOrderSearchParamContext);

// admin画面の注文検索条件状態context
export const SingleOrderSearchParamContextProvider: React.FC = ({ children }) => {
  // useStateの初期値。配送状況は全件が初期値
  const initialState: SingleOrderSearchParam = {
    // 配送状況。デフォルト未発送
    deliveryStatus: DeliveryStatus.ordered,
    // clinic name, phoneNumber検索は未実装
    name: '',
    phoneNumber: '',
  };

  // グローバルに持つ検索条件
  const [searchState, setSearchState] = useState<SingleOrderSearchParam>(initialState);
  return (
    <SingleOrderSearchParamContext.Provider value={{ searchState, setSearchState }}>
      {children}
    </SingleOrderSearchParamContext.Provider>
  );
};
