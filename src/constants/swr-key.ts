export const SWRKey = {
  staffList: 'staffList',
  productList: 'productList',
  SingleOrderList: 'singleOrderList',
  currentUser: 'currentUser',
  orderList: 'orderList',
  adminSingleOrderList: 'adminSingleOrderList',
  subscriptionOrderList: 'subscriptionOrderList',
  orderFormParam: 'orderFormParam',
} as const;

export type SWRKey = typeof SWRKey[keyof typeof SWRKey];
