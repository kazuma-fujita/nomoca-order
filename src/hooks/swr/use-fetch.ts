import useSWR, { Key, KeyedMutator } from 'swr';
import { BareFetcher, PublicConfiguration } from 'swr/dist/types';
import { parseResponseError } from 'utilities/parse-response-error';

export type FetchResponse<Data = any> = {
  data: Data | null;
  error: Error | null;
  isLoading: boolean;
  isEmptyList: boolean;
  mutate: KeyedMutator<Data>;
};

export const useFetch = <Data = any>(
  key: Key,
  fetcher: BareFetcher<Data> | null,
  config?: Partial<PublicConfiguration<Data, any, BareFetcher<Data>>> | undefined,
  mockResponse?: FetchResponse<Data>,
): FetchResponse<Data> => {
  const { data, error, mutate } = useSWR<Data>(key, mockResponse ? null : fetcher, config);
  return mockResponse
    ? {
        ...mockResponse,
        mutate: mutate,
      }
    : ({
        data: data ?? null,
        error: error ? parseResponseError(error) : null,
        isLoading: Boolean(!data && !error),
        isEmptyList: Boolean(Array.isArray(data) && data.length === 0),
        mutate: mutate,
      } as const);
};
