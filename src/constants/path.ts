export const Path = {
  Index: '/',
  singleOrder: '/single-order',
  AdminsSingleOrder: '/admins/single-order',
  subscriptionOrder: '/subscription-order',
  AdminsSubscriptionOrder: '/admins/subscription-order',
  Staff: '/staff',
  SingleOrderProduct: '/admins/single-order-product',
  subscriptionOrderProduct: '/admins/subscription-order-product',
  Clinic: '/clinic',
  Term: '/term',
  ChangePassword: '/change-password',
  SignOut: '/sign-out',
} as const;

export type Path = typeof Path[keyof typeof Path];
