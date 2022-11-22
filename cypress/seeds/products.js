const baseProduct = {
  type: {
    S: 'product',
  },
  isExportCSV: {
    BOOL: true,
  },
  disabled: {
    BOOL: false,
  },
  createdAt: {
    S: '2022-06-22T05:48:41.155Z',
  },
  updatedAt: {
    S: '2022-06-22T05:48:41.155Z',
  },
  owner: {
    S: '3cf5b284-0131-4801-9e65-3b5421c00910',
  },
  isBCartSeparateDeliveryRoute: {
    BOOL: false,
  },
};

export const seedProducts = [
  {
    ...baseProduct,
    id: {
      S: 'b11736c6-710f-4fbb-833c-8fc7c5e31c11',
    },
    orderType: {
      S: 'singleOrder',
    },
    name: {
      S: '高保存ロール紙（112mm幅・100ｍ巻）＜標準＞',
    },
    purchasePrice: {
      N: 13860,
    },
    unitPrice: {
      N: 19800,
    },
    viewOrder: {
      N: 1,
    },
    bCartDeliveryGroupId: {
      N: 3,
    },
    bCartSetId: {
      N: 45,
    },
  },
  {
    ...baseProduct,
    id: {
      S: 'b11736c6-710f-4fbb-833c-8fc7c5e31c12',
    },
    orderType: {
      S: 'singleOrder',
    },
    name: {
      S: '高保存ロール紙（112mm幅・240ｍ巻）＜大径＞',
    },
    purchasePrice: {
      N: 27720,
    },
    unitPrice: {
      N: 39600,
    },
    viewOrder: {
      N: 2,
    },
    bCartDeliveryGroupId: {
      N: 3,
    },
    bCartSetId: {
      N: 46,
    },
  },
  {
    ...baseProduct,
    id: {
      S: 'b11736c6-710f-4fbb-833c-8fc7c5e31c13',
    },
    orderType: {
      S: 'singleOrder',
    },
    name: {
      S: 'コインメックカセットチューブ',
    },
    purchasePrice: {
      N: 7500,
    },
    unitPrice: {
      N: 12500,
    },
    viewOrder: {
      N: 3,
    },
    bCartDeliveryGroupId: {
      N: 4,
    },
    bCartSetId: {
      N: 59,
    },
    isBCartSeparateDeliveryRoute: {
      BOOL: true,
    },
  },
  {
    ...baseProduct,
    id: {
      S: 'b11736c6-710f-4fbb-833c-8fc7c5e31c14',
    },
    orderType: {
      S: 'singleOrder',
    },
    name: {
      S: 'インクリボン(黒/1500枚分1セット)',
    },
    purchasePrice: {
      N: 5060,
    },
    unitPrice: {
      N: 4600,
    },
    viewOrder: {
      N: 4,
    },
    isExportCSV: {
      BOOL: false,
    },
    disabled: {
      BOOL: true,
    },
  },
  {
    ...baseProduct,
    id: {
      S: 'b11736c6-710f-4fbb-833c-8fc7c5e31c15',
    },
    orderType: {
      S: 'singleOrder',
    },
    name: {
      S: 'クリーニングカード(10枚1セット)',
    },
    purchasePrice: {
      N: 800,
    },
    unitPrice: {
      N: 727,
    },
    viewOrder: {
      N: 5,
    },
    isExportCSV: {
      BOOL: false,
    },
    disabled: {
      BOOL: true,
    },
  },
  {
    ...baseProduct,
    id: {
      S: 'b11736c6-710f-4fbb-833c-8fc7c5e31c16',
    },
    orderType: {
      S: 'singleOrder',
    },
    name: {
      S: '無停電電源装置(UPS)',
    },
    purchasePrice: {
      N: 11770,
    },
    unitPrice: {
      N: 20000,
    },
    viewOrder: {
      N: 6,
    },
    isExportCSV: {
      BOOL: false,
    },
    disabled: {
      BOOL: true,
    },
  },
  {
    ...baseProduct,
    id: {
      S: 'b11736c6-710f-4fbb-833c-8fc7c5e31c17',
    },
    orderType: {
      S: 'subscriptionOrder',
    },
    name: {
      S: '高保存ロール紙（112mm幅・100ｍ巻）＜標準＞',
    },
    purchasePrice: {
      N: 13860,
    },
    unitPrice: {
      N: 19800,
    },
    viewOrder: {
      N: 1,
    },
    bCartDeliveryGroupId: {
      N: 3,
    },
    bCartSetId: {
      N: 45,
    },
  },
  {
    ...baseProduct,
    id: {
      S: 'b11736c6-710f-4fbb-833c-8fc7c5e31c18',
    },
    orderType: {
      S: 'subscriptionOrder',
    },
    name: {
      S: '高保存ロール紙（112mm幅・240ｍ巻）＜大径＞',
    },
    purchasePrice: {
      N: 27720,
    },
    unitPrice: {
      N: 39600,
    },
    viewOrder: {
      N: 2,
    },
    bCartDeliveryGroupId: {
      N: 3,
    },
    bCartSetId: {
      N: 46,
    },
  },
];
