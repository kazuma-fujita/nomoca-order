import { useAdminSubscriptionOrderList } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { SubscriptionOrderList } from './subscription-order-list';

type Props = {
  now: Date;
};

export const SubscriptionOrderListContainer = ({ now }: Props) => {
  const fetchReturn = useAdminSubscriptionOrderList();

  return <SubscriptionOrderList {...fetchReturn} now={now} />;
};
