// export enum UserGroup {
//   Admins = 'Admins',
//   Operators = 'Operators',
// }

export const UserGroup = {
  Admins: 'Admins',
  Operators: 'Operators',
} as const;

export type UserGroup = typeof UserGroup[keyof typeof UserGroup];
