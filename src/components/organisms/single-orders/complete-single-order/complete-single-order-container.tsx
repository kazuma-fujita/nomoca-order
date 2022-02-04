import { Path } from 'constants/path';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useOrderFormParam } from 'stores/use-order-form-param';
import { CompleteSingleOrder } from './complete-single-order';

export const CompleteSingleOrderContainer = () => {
  const router = useRouter();
  const { data, mutate } = useOrderFormParam();
  if (!data) {
    router.push(Path.singleOrder);
  }
  const onButtonClick = useCallback(() => {
    // It clears all global order form cache.
    mutate(undefined, false);
    router.push(Path.singleOrder);
  }, [mutate, router]);

  return <CompleteSingleOrder onButtonClick={onButtonClick} />;
};
