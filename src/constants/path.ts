export const Path = {
  index: '/',
  singleOrder: '/single-order',
  subscriptionOrder: '/subscription-order',
  subscriptionOrderHistory: '/subscription-order-history',
  adminsSingleOrder: '/admins/single-order',
  adminsSubscriptionOrder: '/admins/subscription-order',
  adminsSubscriptionOrderHistory: '/admins/subscription-order-history',
  staff: '/staff',
  singleOrderProduct: '/admins/single-order-product',
  subscriptionOrderProduct: '/admins/subscription-order-product',
  clinic: '/clinic',
  terms: '/terms',
  changePassword: '/change-password',
  signOut: '/sign-out',
} as const;

export type Path = typeof Path[keyof typeof Path];
