import { useFetchSubscriptionOrderList } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { SubscriptionOrderTemplate } from 'components/templates/subscription-orders/subscription-order-template';

export const SubscriptionOrderTemplateContainer = () => {
  const fetchReturn = useFetchSubscriptionOrderList();

  return <SubscriptionOrderTemplate {...fetchReturn} />;
};
