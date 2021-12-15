import { useFetchAdminSubscriptionOrderList } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { SubscriptionOrderList } from './subscription-order-list';

export const SubscriptionOrderListContainer = () => {
  const fetchReturn = useFetchAdminSubscriptionOrderList();

  return <SubscriptionOrderList {...fetchReturn} />;
};
