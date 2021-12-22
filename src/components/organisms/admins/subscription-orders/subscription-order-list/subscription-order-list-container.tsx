import { useAdminSubscriptionOrderList } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { SubscriptionOrderList } from './subscription-order-list';

export const SubscriptionOrderListContainer = () => {
  const fetchReturn = useAdminSubscriptionOrderList();

  return <SubscriptionOrderList {...fetchReturn} />;
};
