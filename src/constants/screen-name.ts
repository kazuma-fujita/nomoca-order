export const ScreenName = {
  SingleOrder: '注文',
  AdminsSingleOrder: '注文管理',
  SubscriptionOrder: '定期便申し込み',
  AdminsSubscriptionOrder: '定期便管理',
  Staff: '担当者管理',
  Product: '商品管理',
  SingleOrderProduct: '通常注文商品管理',
  SubscriptionOrderProduct: '定期便商品管理',
  Clinic: '施設情報編集',
  Term: '利用規約',
  ChangePassword: 'パスワード変更',
  SignOut: 'ログアウト',
} as const;

export type ScreenName = typeof ScreenName[keyof typeof ScreenName];
