import { useFetchSubscriptionOrderList } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { SubscriptionOrderList } from './subscription-order-list';

export const SubscriptionOrderListContainer = () => {
  const fetchReturn = useFetchSubscriptionOrderList();

  return <SubscriptionOrderList {...fetchReturn} />;
};
