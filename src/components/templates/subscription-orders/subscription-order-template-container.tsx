import { SubscriptionOrderListContainer } from 'components/organisms/subscription-orders/subscription-order-list/subscription-order-list-container';
import { SubscriptionOrderTemplate } from './subscription-order-template';

export const SubscriptionOrderTemplateContainer = () => (
  <SubscriptionOrderTemplate listComponent={<SubscriptionOrderListContainer />} />
);
