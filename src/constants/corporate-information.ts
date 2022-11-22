export const CorporateInformation = {
  name: '株式会社GENOVA',
  department: 'スマートクリニック事業部',
  phoneNumber: '0120-811-009',
  postalCode: '1508510',
  state: '東京都',
  address1: '渋谷区',
  address2: '渋谷2-21-1',
  building: '渋谷ヒカリエ34階',
  mailAddress: 'nomoca-support@genova.co.jp',
  staff: '倉田有紗',
} as const;

export type CorporateInformation = typeof CorporateInformation[keyof typeof CorporateInformation];
