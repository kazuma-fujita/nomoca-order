import { DeliveryStatus } from 'API';
import { SingleOrderSearchParam } from 'components/organisms/admins/single-orders/search-form/single-order-search-form';
import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

type ProviderProps = {
  searchState: SingleOrderSearchParam;
  setSearchState: Dispatch<SetStateAction<SingleOrderSearchParam>>;
};

const SingleOrderSearchParamContext = createContext({} as ProviderProps);

export const useSingleOrderSearchParam = () => useContext(SingleOrderSearchParamContext);

export const SingleOrderSearchParamContextProvider: React.FC = ({ children }) => {
  // useStateの初期値。配送状況は全件が初期値
  const initialState: SingleOrderSearchParam = {
    deliveryStatus: DeliveryStatus.none,
    name: '',
    phoneNumber: '',
  };
  const [searchState, setSearchState] = useState<SingleOrderSearchParam>(initialState);
  return (
    <SingleOrderSearchParamContext.Provider value={{ searchState, setSearchState }}>
      {children}
    </SingleOrderSearchParamContext.Provider>
  );
};
