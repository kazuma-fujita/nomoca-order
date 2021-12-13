import { useFetchSubscriptionOrderList } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import React from 'react';
import { useToggle } from 'react-use';
import { SubscriptionOrderList } from './subscription-order-list';

export const SubscriptionOrderListContainer = () => {
  const fetchReturn = useFetchSubscriptionOrderList();
  const [on, toggle] = useToggle(false);

  return <SubscriptionOrderList {...fetchReturn} on={on} toggle={toggle} />;
};
