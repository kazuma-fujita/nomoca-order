// export enum ObjectType {
//   SingleOrder = 'SingleOrder',
//   SubscriptionOrder = 'SubscriptionOrder',
//   Staff = 'Staff',
//   Clinic = 'Clinic',
// }

export const ObjectType = {
  SubscriptionOrder: 'SubscriptionOrder',
} as const;

export type ObjectType = typeof ObjectType[keyof typeof ObjectType];
