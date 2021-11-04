// export enum SWRKey {
//   CurrentUser = 'currentUser',
//   StaffList = 'staffList',
//   SubscriptionOrderList = 'subscriptionOrderList',
// }

export const SWRKey = {
  CurrentUser: 'currentUser',
  StaffList: 'staffList',
  ProductList: 'productList',
  SubscriptionOrderList: 'subscriptionOrderList',
} as const;

export type SWRKey = typeof SWRKey[keyof typeof SWRKey];

export const SWRAllStaffListKey = [SWRKey.StaffList, false];
export const SWRActiveStaffListKey = [SWRKey.StaffList, true];

export const SWRAllProductListKey = [SWRKey.ProductList, false];
export const SWRActiveProductListKey = [SWRKey.ProductList, true];
