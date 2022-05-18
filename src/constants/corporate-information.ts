export const CorporateInformation = {
  // View表示用
  phoneNumber: '0120-811-009',
  // CSV出力用
  name: '株式会社GENOVA',
  exportCSVphoneNumber: '0120811009',
  postalCode: '1508510',
  state: '東京都',
  address: '東京都渋谷区渋谷2-21-1 渋谷ヒカリエ34階',
} as const;

export type CorporateInformation = typeof CorporateInformation[keyof typeof CorporateInformation];
