export enum SWRKey {
  CurrentUser = 'currentUser',
  StaffList = 'staffList',
  SubscriptionOrderList = 'subscriptionOrderList',
}

export const SWRAllStaffListKey = [SWRKey.StaffList, false];
export const SWRActiveStaffListKey = [SWRKey.StaffList, true];
