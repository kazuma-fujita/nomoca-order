// export enum SWRKey {
//   CurrentUser = 'currentUser',
//   StaffList = 'staffList',
//   SubscriptionOrderList = 'subscriptionOrderList',
// }

export const SWRKey = {
  CurrentUser: 'currentUser',
  StaffList: 'staffList',
  SubscriptionOrderList: 'subscriptionOrderList',
} as const;

export type SWRKey = typeof SWRKey[keyof typeof SWRKey];

export const SWRAllStaffListKey = [SWRKey.StaffList, false];
export const SWRActiveStaffListKey = [SWRKey.StaffList, true];
