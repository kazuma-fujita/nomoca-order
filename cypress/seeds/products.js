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
      S: '注文商品A',
    },
    purchasePrice: {
      N: '800',
    },
    unitPrice: {
      N: '1000',
    },
    viewOrder: {
      N: '1',
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
      S: '注文商品B',
    },
    purchasePrice: {
      N: '1600',
    },
    unitPrice: {
      N: '2000',
    },
    viewOrder: {
      N: '2',
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
      S: '注文商品C',
    },
    purchasePrice: {
      N: '2400',
    },
    unitPrice: {
      N: '3000',
    },
    viewOrder: {
      N: '3',
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
      S: 'CSV出力無効注文商品A',
    },
    purchasePrice: {
      N: '3200',
    },
    unitPrice: {
      N: '4000',
    },
    viewOrder: {
      N: '4',
    },
    isExportCSV: {
      BOOL: false,
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
      S: 'CSV出力無効注文商品B',
    },
    purchasePrice: {
      N: '4000',
    },
    unitPrice: {
      N: '5000',
    },
    viewOrder: {
      N: '5',
    },
    isExportCSV: {
      BOOL: false,
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
      S: 'CSV出力無効注文商品C',
    },
    purchasePrice: {
      N: '4800',
    },
    unitPrice: {
      N: '6000',
    },
    viewOrder: {
      N: '6',
    },
    isExportCSV: {
      BOOL: false,
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
      S: '定期便商品A',
    },
    purchasePrice: {
      N: '800',
    },
    unitPrice: {
      N: '1000',
    },
    viewOrder: {
      N: '1',
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
      S: '定期便商品B',
    },
    purchasePrice: {
      N: '1600',
    },
    unitPrice: {
      N: '2000',
    },
    viewOrder: {
      N: '2',
    },
  },
  {
    ...baseProduct,
    id: {
      S: 'b11736c6-710f-4fbb-833c-8fc7c5e31c19',
    },
    orderType: {
      S: 'subscriptionOrder',
    },
    name: {
      S: '定期便商品C',
    },
    purchasePrice: {
      N: '2400',
    },
    unitPrice: {
      N: '3000',
    },
    viewOrder: {
      N: '3',
    },
  },
  {
    ...baseProduct,
    id: {
      S: 'b11736c6-710f-4fbb-833c-8fc7c5e31c20',
    },
    orderType: {
      S: 'subscriptionOrder',
    },
    name: {
      S: 'CSV出力無効定期便商品A',
    },
    purchasePrice: {
      N: '3200',
    },
    unitPrice: {
      N: '4000',
    },
    viewOrder: {
      N: '4',
    },
    isExportCSV: {
      BOOL: false,
    },
  },
  {
    ...baseProduct,
    id: {
      S: 'b11736c6-710f-4fbb-833c-8fc7c5e31c21',
    },
    orderType: {
      S: 'subscriptionOrder',
    },
    name: {
      S: 'CSV出力無効定期便商品B',
    },
    purchasePrice: {
      N: '4000',
    },
    unitPrice: {
      N: '5000',
    },
    viewOrder: {
      N: '5',
    },
    isExportCSV: {
      BOOL: false,
    },
  },
  {
    ...baseProduct,
    id: {
      S: 'b11736c6-710f-4fbb-833c-8fc7c5e31c22',
    },
    orderType: {
      S: 'subscriptionOrder',
    },
    name: {
      S: 'CSV出力無効定期便商品C',
    },
    purchasePrice: {
      N: '4800',
    },
    unitPrice: {
      N: '6000',
    },
    viewOrder: {
      N: '6',
    },
    isExportCSV: {
      BOOL: false,
    },
  },
];
