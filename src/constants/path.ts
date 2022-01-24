// export enum Path {
//   Index = '/',
//   SingleOrder = 'single-order',
//   SubscriptionOrder = 'subscription-order',
//   Staff = 'staff',
//   Clinic = 'clinic',
//   Term = 'term',
//   ChangePassword = 'change-password',
//   SignOut = 'sign-out',
// }

export const Path = {
  Index: '/',
  SingleOrder: '/single-order',
  AdminsSingleOrder: '/admins/single-order',
  SubscriptionOrder: '/subscription-order',
  AdminsSubscriptionOrder: '/admins/subscription-order',
  Staff: '/staff',
  Product: '/product',
  SingleOrderProduct: '/admins/single-order-product',
  SubscriptionOrderProduct: '/admins/subscription-order-product',
  Clinic: '/clinic',
  Term: '/term',
  ChangePassword: '/change-password',
  SignOut: '/sign-out',
} as const;

export type Path = typeof Path[keyof typeof Path];
