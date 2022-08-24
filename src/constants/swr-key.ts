export const SWRKey = {
  currentUser: 'currentUser',
  clinic: 'clinic',
  staffList: 'staffList',
  productList: 'productList',
  orderList: 'orderList',
  subscriptionOrderList: 'subscriptionOrderList',
  orderFormParam: 'orderFormParam',
  singleOrderSearchParam: 'singleOrderSearchParam',
} as const;

export type SWRKey = typeof SWRKey[keyof typeof SWRKey];
