export const SWRKey = {
  CurrentUser: 'currentUser',
  staffList: 'staffList',
  productList: 'productList',
  SingleOrderList: 'singleOrderList',
  AdminSingleOrderList: 'adminSingleOrderList',
  AdminSubscriptionOrderList: 'adminSubscriptionOrderList',
  AdminAllSubscriptionOrderList: 'adminAllSubscriptionOrderList',
  orderList: 'orderList',
  subscriptionOrderList: 'subscriptionOrderList',
  orderFormParam: 'orderFormParam',
} as const;

export type SWRKey = typeof SWRKey[keyof typeof SWRKey];
