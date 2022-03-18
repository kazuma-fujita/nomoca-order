export const ScreenName = {
  SingleOrder: '注文',
  adminsSingleOrder: '注文管理',
  SubscriptionOrder: '定期便申し込み',
  adminsSubscriptionOrder: '定期便管理',
  Staff: '担当者',
  SingleOrderProduct: '注文商品管理',
  SubscriptionOrderProduct: '定期便商品管理',
  clinic: '配送先',
  Term: '利用規約',
  ChangePassword: 'パスワード変更',
  SignOut: 'ログアウト',
} as const;

export type ScreenName = typeof ScreenName[keyof typeof ScreenName];
