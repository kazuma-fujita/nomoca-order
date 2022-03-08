export const SWRKey = {
  CurrentUser: 'currentUser',
  StaffList: 'staffList',
  ProductList: 'productList',
  SingleOrderList: 'singleOrderList',
  AdminSingleOrderList: 'adminSingleOrderList',
  AdminSubscriptionOrderList: 'adminSubscriptionOrderList',
  AdminAllSubscriptionOrderList: 'adminAllSubscriptionOrderList',
  orderList: 'orderList',
  subscriptionOrderList: 'subscriptionOrderList',
  orderFormParam: 'orderFormParam',
} as const;

export type SWRKey = typeof SWRKey[keyof typeof SWRKey];

export const SWRMultiKey = {
  AllStaffList: [SWRKey.StaffList, false],
  ActiveStaffList: [SWRKey.StaffList, true],
};

export type SWRMultiKey = typeof SWRMultiKey[keyof typeof SWRMultiKey];
