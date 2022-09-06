export const ScreenName = {
  singleOrder: '注文',
  adminsSingleOrder: '注文管理',
  subscriptionOrder: '定期便申し込み',
  adminsSubscriptionOrder: '定期便管理',
  staff: '発注担当者',
  singleOrderProduct: '注文商品管理',
  subscriptionOrderProduct: '定期便商品管理',
  clinic: '配送先',
  terms: '利用規約',
  changePassword: 'パスワード変更',
  signOut: 'ログアウト',
} as const;

export type ScreenName = typeof ScreenName[keyof typeof ScreenName];
