import { ModelSubscriptionOrderProductConnection, SubscriptionOrder, SubscriptionOrderProduct, Type } from 'API';
import { ExtendedOrder } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { createNormalizedProductsMock, productMock } from 'mocks/product.mock';
import { clinicMock } from './clinic.mock';
import { staffMock } from './staff.mock';

const productRelation: SubscriptionOrderProduct = {
  __typename: 'SubscriptionOrderProduct',
  id: '',
  subscriptionOrderID: '',
  productID: '',
  product: productMock,
  quantity: 1,
  createdAt: '2021-11-25T14:32:55Z',
  updatedAt: '2021-11-25T14:32:55Z',
};

const products: ModelSubscriptionOrderProductConnection = {
  __typename: 'ModelSubscriptionOrderProductConnection',
  items: [productRelation],
};

const item: SubscriptionOrder = {
  __typename: 'SubscriptionOrder',
  id: 'dummyID',
  clinicID: '',
  staffID: '',
  type: Type.subscriptionOrder,
  products: products,
  clinic: clinicMock,
  staff: staffMock,
  deliveryStartYear: 2022,
  deliveryStartMonth: 1,
  deliveryInterval: 1,
  createdAt: '2021-11-25T14:32:55Z',
  updatedAt: '2021-11-25T14:32:55Z',
};

const createProductRelations = (row: number): SubscriptionOrderProduct[] =>
  [...Array(row)].map((_, i) => ({
    ...productRelation,
    product: {
      ...productMock,
      id: `dummyProductID-${i + 1}`,
      name: `商品${row}-${i + 1}`,
    },
  }));

export const generateSubscriptionOrderListMock = (generateCount: number): ExtendedOrder<SubscriptionOrder>[] =>
  [...Array(generateCount)].map((_, i) => ({
    ...item,
    id: `dummyID-${i + 1}`,
    products: {
      ...products,
      items: createProductRelations(i + 1),
    },
    normalizedProducts: createNormalizedProductsMock(i + 1),
    staff: { ...item.staff, id: `dummyStaffID-${i + 1}`, lastName: `佐藤`, firstName: `太郎${i + 1}` },
    deliveryStartMonth: i + 1,
    deliveryInterval: i + 1,
    updatedAt: new Date(2021, 1 + i, 2 + i, 12 + i, 30 + i, 0).toISOString(),
  }));

export const subscriptionOrderListMock: ExtendedOrder<SubscriptionOrder>[] = generateSubscriptionOrderListMock(12);
