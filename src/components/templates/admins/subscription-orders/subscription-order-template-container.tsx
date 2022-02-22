import { useAdminSubscriptionOrderList } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { SubscriptionOrderTemplate } from './subscription-order-template';

export const SubscriptionOrderTemplateContainer = () => {
  const fetchReturn = useAdminSubscriptionOrderList();
  return <SubscriptionOrderTemplate {...fetchReturn} />;
};
