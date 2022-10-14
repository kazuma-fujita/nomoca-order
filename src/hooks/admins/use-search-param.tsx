import { DeliveryStatus } from 'API';
import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

export type SearchParam = {
  deliveryStatus: DeliveryStatus;
  name: string | null;
  phoneNumber: string | null;
  fromDate: string | null;
  toDate: string | null;
};

type ProviderProps = {
  searchState: SearchParam;
  setSearchState: Dispatch<SetStateAction<SearchParam>>;
};

const SearchParamContext = createContext({} as ProviderProps);

export const useSearchParam = () => useContext(SearchParamContext);

// admin画面の注文検索条件状態context
export const SearchParamContextProvider: React.FC = ({ children }) => {
  // useStateの初期値
  const initialState: SearchParam = {
    // 配送状況はデフォルト未発送
    deliveryStatus: DeliveryStatus.ordered,
    name: null,
    phoneNumber: null,
    fromDate: null,
    toDate: null,
  };

  // グローバルに持つ検索条件
  const [searchState, setSearchState] = useState<SearchParam>(initialState);
  return <SearchParamContext.Provider value={{ searchState, setSearchState }}>{children}</SearchParamContext.Provider>;
};
