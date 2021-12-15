export const ScreenName = {
  SingleOrder: '注文',
  AdminSingleOrder: '注文管理',
  SubscriptionOrder: '定期便申し込み',
  AdminSubscriptionOrder: '定期便管理',
  Staff: '担当者管理',
  Product: '商品管理',
  Clinic: '施設情報編集',
  Term: '利用規約',
  ChangePassword: 'パスワード変更',
  SignOut: 'ログアウト',
} as const;

export type ScreenName = typeof ScreenName[keyof typeof ScreenName];
