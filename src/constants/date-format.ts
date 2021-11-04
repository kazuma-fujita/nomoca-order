// export enum DateFormat {
//   YMD = 'yyyy/MM/dd',
//   YMDHM = 'yyyy/MM/dd HH:mm',
// }

export const DateFormat = {
  Date: 'yyyy/MM/dd',
  DateHourMinute: 'yyyy/MM/dd HH:mm',
} as const;

export type DateFormat = typeof DateFormat[keyof typeof DateFormat];
