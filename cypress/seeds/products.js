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
      S: 'subscriptionOrder',
    },
    name: {
      S: '定期便商品A',
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
      S: 'b11736c6-710f-4fbb-833c-8fc7c5e31c15',
    },
    orderType: {
      S: 'subscriptionOrder',
    },
    name: {
      S: '定期便商品B',
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
      S: 'b11736c6-710f-4fbb-833c-8fc7c5e31c16',
    },
    orderType: {
      S: 'subscriptionOrder',
    },
    name: {
      S: '定期便商品C',
    },
    unitPrice: {
      N: '3000',
    },
    viewOrder: {
      N: '3',
    },
  },
];
