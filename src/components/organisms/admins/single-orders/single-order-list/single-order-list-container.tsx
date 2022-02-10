import { useFetchOrderList } from 'hooks/orders/use-fetch-order-list';
import { SingleOrderList } from './single-order-list';

export const SingleOrderListContainer = () => {
  const fetchReturn = useFetchOrderList();

  return <SingleOrderList {...fetchReturn} />;
};
