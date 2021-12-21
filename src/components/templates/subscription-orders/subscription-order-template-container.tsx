import { SubscriptionOrderListContainer } from 'components/organisms/subscription-orders/subscription-order-list/subscription-order-list-container';
import { SubscriptionOrderTemplate } from './subscription-order-template';

type Props = {
  now: Date;
};

export const SubscriptionOrderTemplateContainer = ({ now }: Props) => (
  <SubscriptionOrderTemplate listComponent={<SubscriptionOrderListContainer now={now} />} />
);
