import { DeliveryStatus } from 'API';
import { DateFormat } from 'constants/date-format';
import { endOfMonth, format, startOfMonth } from 'date-fns';
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
  const now = new Date();
  // useStateの初期値
  const initialState: SearchParam = {
    deliveryStatus: DeliveryStatus.ordered, // 配送状況はデフォルト未発送
    name: null,
    phoneNumber: null,
    fromDate: format(startOfMonth(now), DateFormat.simpleDate), // 検索開始日時はデフォルト当月月初
    toDate: format(endOfMonth(now), DateFormat.simpleDate), // 検索終了日時はデフォルト当月月末
  };

  // グローバルに持つ検索条件
  const [searchState, setSearchState] = useState<SearchParam>(initialState);
  return <SearchParamContext.Provider value={{ searchState, setSearchState }}>{children}</SearchParamContext.Provider>;
};
