import { createContext, useContext } from 'react';
import { getCurrentDate } from 'graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api';
import { FetchResponse, useFetch } from 'hooks/swr/use-fetch';
import { GetCurrentDateQuery } from 'API';

const NowDateContext = createContext({} as FetchResponse<Date>);

export const useNowDate = () => useContext(NowDateContext);

const fetcher = async () => {
  // currentDate lambda関数を実行しサーバ現在時刻を取得
  const result = (await API.graphql(graphqlOperation(getCurrentDate))) as GraphQLResult<GetCurrentDateQuery>;
  if (!result.data || !result.data.getCurrentDate || !result.data.getCurrentDate.currentDate) {
    throw Error('It was returned null after the API had fetched data.');
  }
  // 文字列型をDate型に変換。サーバからはUTC時刻が返却されるので、Dateオブジェクトで+9時間JST時刻に変換
  console.log('server time', result.data.getCurrentDate.currentDate);
  const now = new Date(result.data.getCurrentDate.currentDate);
  console.log('date time', now);
  return now;
};

type Props = {
  now?: Date;
};

export const NowDateContextProvider: React.FC<Props> = ({ now, ...rest }) => {
  // nowはjest、storybookで使用するmock date。nowがあれば型を合わせる為にFetchResponseに変換
  const mockDate = now && ({ data: now } as FetchResponse<Date>);
  // useFetchは内部的にnow Propsが無いmockDateがundefinedの場合fetcherを呼ぶ
  const response = useFetch<Date>('currentDate', fetcher, {}, mockDate);
  return <NowDateContext.Provider value={response} {...rest} />;
};
