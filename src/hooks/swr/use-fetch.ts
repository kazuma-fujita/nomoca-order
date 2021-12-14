import useSWR, { Fetcher, Key, KeyedMutator } from 'swr';
import { parseResponseError } from 'utilities/parse-response-error';

export type FetchResponse<Data = any> = {
  data: Data | null;
  error: Error | null;
  isLoading: boolean;
  isEmptyList: boolean;
  mutate: KeyedMutator<Data>;
};

export const useFetch = <Data = any>(key: Key, fetcher: Fetcher<Data>): FetchResponse<Data> => {
  const { data, error, mutate } = useSWR<Data>(key, fetcher);
  return {
    data: data ?? null,
    error: error ? parseResponseError(error) : null,
    isLoading: Boolean(!data && !error),
    isEmptyList: Boolean(Array.isArray(data) && data.length == 0),
    mutate: mutate,
  } as const;
};
