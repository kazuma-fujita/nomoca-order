import useSWR, { Fetcher, Key } from 'swr';
import { parseResponseError } from 'utilities/parse-response-error';

export const useFetch = <Data = any>(key: Key, fetcher: Fetcher<Data>) => {
  const { data, error, mutate } = useSWR<Data, Error>(key, fetcher);
  if (Array.isArray(data)) {
    console.log('array:', data);
  }
  return {
    data: data ?? null,
    error: error ? parseResponseError(error) : null,
    isLoading: Boolean(!data && !error),
    isEmpty: Boolean(Array.isArray(data) && data.length == 0),
    mutate: mutate,
  } as const;
};
