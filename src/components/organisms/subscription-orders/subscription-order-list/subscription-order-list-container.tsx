import { useFetchSubscriptionOrderList } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { SubscriptionOrderList } from './subscription-order-list';

type Props = {
  now: Date;
};

export const SubscriptionOrderListContainer = ({ now }: Props) => {
  const fetchReturn = useFetchSubscriptionOrderList();

  return <SubscriptionOrderList {...fetchReturn} now={now} />;
};
