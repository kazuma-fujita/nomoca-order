export const SWRKey = {
  CurrentUser: 'currentUser',
  StaffList: 'staffList',
  ProductList: 'productList',
  SingleOrderList: 'singleOrderList',
  AdminSingleOrderList: 'adminSingleOrderList',
  SubscriptionOrderList: 'subscriptionOrderList',
  AdminSubscriptionOrderList: 'adminSubscriptionOrderList',
  AdminAllSubscriptionOrderList: 'adminAllSubscriptionOrderList',
} as const;

export type SWRKey = typeof SWRKey[keyof typeof SWRKey];

export const SWRMultiKey = {
  AllStaffList: [SWRKey.StaffList, false],
  ActiveStaffList: [SWRKey.StaffList, true],
};

export type SWRMultiKey = typeof SWRMultiKey[keyof typeof SWRMultiKey];
