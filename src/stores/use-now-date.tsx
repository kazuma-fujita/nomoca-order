import { createContext, useContext } from 'react';

type Props = {
  now: Date;
};

const NowDateContext = createContext({} as Props);

export const useNowDate = () => useContext(NowDateContext);

export const NowDateContextProvider: React.FC<Props> = ({ now, ...rest }) => {
  return <NowDateContext.Provider value={{ now }} {...rest} />;
};
