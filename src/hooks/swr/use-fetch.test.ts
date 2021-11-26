import { useFetch } from './use-fetch';
import { renderHook, act } from '@testing-library/react-hooks';

describe('describe', () => {
  test('test', () => {
    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const result = renderHook(() => useFetch('dummy', fetcher)).result;
    // const { data, error, isLoading, isEmpty } = useFetch('dummy', fetcher);

    console.log('data:', result.current.data);
    console.log('error:', result.current.error);
    console.log('isLoading:', result.current.isLoading);
    console.log('isEmpty:', result.current.isEmpty);
    expect(1).toBe(1);
  });
});
