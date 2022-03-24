import { GraphQLResult } from '@aws-amplify/api';
import { Clinic, ListClinicsQuery, Type } from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { listClinics } from 'graphql/queries';
import { FetchResponse, useFetch } from 'hooks/swr/use-fetch';
import { createContext, useContext } from 'react';

const ClinicContext = createContext({} as FetchResponse<Clinic | null>);

export const useFetchClinic = () => useContext(ClinicContext);

const fetcher = async () => {
  // Graphql query操作実行
  const result = (await API.graphql(graphqlOperation(listClinics))) as GraphQLResult<ListClinicsQuery>;
  if (!result.data || !result.data.listClinics || !result.data.listClinics.items) {
    throw Error('It was returned null after the API had fetched data.');
  }
  const clinics = result.data.listClinics.items as Clinic[];
  if (clinics.length > 1) {
    throw Error('It was found two clinics or over.');
  }
  return clinics.length ? clinics[0] : null;
};

// 配送先を実装する画面はTop階層(pages)で一回のみデータfetch、useContextを利用してdataを使い回す
export const ClinicContextProvider: React.FC = ({ ...rest }) => {
  const response = useFetch<Clinic | null>(Type.clinic, fetcher, { revalidateOnFocus: false });
  return <ClinicContext.Provider value={response} {...rest} />;
};