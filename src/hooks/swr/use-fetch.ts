import useSWR, { Fetcher, Key } from 'swr';
import { parseResponseError } from 'utilities/parse-response-error';

export const useFetch = <Data = any>(key: Key, fetcher: Fetcher<Data[]>) => {
  const { data, error, mutate } = useSWR<Data[], Error>(key, fetcher);
  return {
    data: data ?? null,
    error: error ? parseResponseError(error) : null,
    isLoading: Boolean(!data && !error),
    isEmpty: Boolean(data && data.length == 0),
    mutate: mutate,
  } as const;
};
