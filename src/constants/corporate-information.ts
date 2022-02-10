export const CorporateInformation = {
  phoneNumber: '0120-811-009',
} as const;

export type CorporateInformation = typeof CorporateInformation[keyof typeof CorporateInformation];
