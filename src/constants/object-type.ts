// export enum ObjectType {
//   SingleOrder = 'SingleOrder',
//   SubscriptionOrder = 'SubscriptionOrder',
//   Staff = 'Staff',
//   Clinic = 'Clinic',
// }

export const ObjectType = {
  SingleOrder: 'SingleOrder',
  SubscriptionOrder: 'SubscriptionOrder',
  Staff: 'Staff',
  Clinic: 'Clinic',
} as const;

export type ObjectType = typeof ObjectType[keyof typeof ObjectType];
