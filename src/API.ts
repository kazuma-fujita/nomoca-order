/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateOrderInput = {
  id?: string | null,
  type: Type,
  orderType: OrderType,
  staffID: string,
  deliveryStatus?: DeliveryStatus | null,
  deliveryType?: DeliveryType | null,
  deliveryStartYear?: number | null,
  deliveryStartMonth?: number | null,
  deliveryInterval?: number | null,
  deliveredAt?: string | null,
  createdAt?: string | null,
};

export enum Type {
  order = "order",
  product = "product",
  staff = "staff",
  clinic = "clinic",
}


export enum OrderType {
  singleOrder = "singleOrder",
  subscriptionOrder = "subscriptionOrder",
}


export enum DeliveryStatus {
  ordered = "ordered",
  delivered = "delivered",
  canceled = "canceled",
}


export enum DeliveryType {
  regular = "regular",
  express = "express",
}


export type ModelOrderConditionInput = {
  type?: ModelTypeInput | null,
  orderType?: ModelOrderTypeInput | null,
  staffID?: ModelIDInput | null,
  deliveryStatus?: ModelDeliveryStatusInput | null,
  deliveryType?: ModelDeliveryTypeInput | null,
  deliveryStartYear?: ModelIntInput | null,
  deliveryStartMonth?: ModelIntInput | null,
  deliveryInterval?: ModelIntInput | null,
  deliveredAt?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelOrderConditionInput | null > | null,
  or?: Array< ModelOrderConditionInput | null > | null,
  not?: ModelOrderConditionInput | null,
};

export type ModelTypeInput = {
  eq?: Type | null,
  ne?: Type | null,
};

export type ModelOrderTypeInput = {
  eq?: OrderType | null,
  ne?: OrderType | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelDeliveryStatusInput = {
  eq?: DeliveryStatus | null,
  ne?: DeliveryStatus | null,
};

export type ModelDeliveryTypeInput = {
  eq?: DeliveryType | null,
  ne?: DeliveryType | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type Order = {
  __typename: "Order",
  id: string,
  type: Type,
  orderType: OrderType,
  staffID: string,
  products?: ModelOrderProductConnection | null,
  staff: Staff,
  deliveryStatus?: DeliveryStatus | null,
  deliveryType?: DeliveryType | null,
  deliveryStartYear?: number | null,
  deliveryStartMonth?: number | null,
  deliveryInterval?: number | null,
  deliveredAt?: string | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type ModelOrderProductConnection = {
  __typename: "ModelOrderProductConnection",
  items:  Array<OrderProduct | null >,
  nextToken?: string | null,
};

export type OrderProduct = {
  __typename: "OrderProduct",
  id: string,
  orderID: string,
  productID: string,
  product: Product,
  quantity: number,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type Product = {
  __typename: "Product",
  id: string,
  name: string,
  unitPrice: number,
  type: Type,
  orderType: OrderType,
  viewOrder: number,
  disabled: boolean,
  createdAt: string,
  updatedAt: string,
};

export type Staff = {
  __typename: "Staff",
  id: string,
  name: string,
  type: Type,
  viewOrder: number,
  disabled: boolean,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateOrderInput = {
  id: string,
  type?: Type | null,
  orderType?: OrderType | null,
  staffID?: string | null,
  deliveryStatus?: DeliveryStatus | null,
  deliveryType?: DeliveryType | null,
  deliveryStartYear?: number | null,
  deliveryStartMonth?: number | null,
  deliveryInterval?: number | null,
  deliveredAt?: string | null,
  createdAt?: string | null,
};

export type DeleteOrderInput = {
  id: string,
};

export type CreateOrderProductInput = {
  id?: string | null,
  orderID: string,
  productID: string,
  quantity: number,
};

export type ModelOrderProductConditionInput = {
  orderID?: ModelIDInput | null,
  productID?: ModelIDInput | null,
  quantity?: ModelIntInput | null,
  and?: Array< ModelOrderProductConditionInput | null > | null,
  or?: Array< ModelOrderProductConditionInput | null > | null,
  not?: ModelOrderProductConditionInput | null,
};

export type UpdateOrderProductInput = {
  id: string,
  orderID?: string | null,
  productID?: string | null,
  quantity?: number | null,
};

export type DeleteOrderProductInput = {
  id: string,
};

export type CreateSubscriptionOrderInput = {
  id?: string | null,
  staffID: string,
  type: string,
  deliveryStartYear: number,
  deliveryStartMonth: number,
  deliveryInterval: number,
  createdAt?: string | null,
};

export type ModelSubscriptionOrderConditionInput = {
  staffID?: ModelIDInput | null,
  type?: ModelStringInput | null,
  deliveryStartYear?: ModelIntInput | null,
  deliveryStartMonth?: ModelIntInput | null,
  deliveryInterval?: ModelIntInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelSubscriptionOrderConditionInput | null > | null,
  or?: Array< ModelSubscriptionOrderConditionInput | null > | null,
  not?: ModelSubscriptionOrderConditionInput | null,
};

export type SubscriptionOrder = {
  __typename: "SubscriptionOrder",
  id: string,
  staffID: string,
  type: string,
  products?: ModelSubscriptionOrderProductConnection | null,
  staff: Staff,
  deliveryStartYear: number,
  deliveryStartMonth: number,
  deliveryInterval: number,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type ModelSubscriptionOrderProductConnection = {
  __typename: "ModelSubscriptionOrderProductConnection",
  items:  Array<SubscriptionOrderProduct | null >,
  nextToken?: string | null,
};

export type SubscriptionOrderProduct = {
  __typename: "SubscriptionOrderProduct",
  id: string,
  subscriptionOrderID: string,
  productID: string,
  product: Product,
  quantity: number,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateSubscriptionOrderInput = {
  id: string,
  staffID?: string | null,
  type?: string | null,
  deliveryStartYear?: number | null,
  deliveryStartMonth?: number | null,
  deliveryInterval?: number | null,
  createdAt?: string | null,
};

export type DeleteSubscriptionOrderInput = {
  id: string,
};

export type CreateSubscriptionOrderProductInput = {
  id?: string | null,
  subscriptionOrderID: string,
  productID: string,
  quantity: number,
};

export type ModelSubscriptionOrderProductConditionInput = {
  subscriptionOrderID?: ModelIDInput | null,
  productID?: ModelIDInput | null,
  quantity?: ModelIntInput | null,
  and?: Array< ModelSubscriptionOrderProductConditionInput | null > | null,
  or?: Array< ModelSubscriptionOrderProductConditionInput | null > | null,
  not?: ModelSubscriptionOrderProductConditionInput | null,
};

export type UpdateSubscriptionOrderProductInput = {
  id: string,
  subscriptionOrderID?: string | null,
  productID?: string | null,
  quantity?: number | null,
};

export type DeleteSubscriptionOrderProductInput = {
  id: string,
};

export type CreateProductInput = {
  id?: string | null,
  name: string,
  unitPrice: number,
  type: Type,
  orderType: OrderType,
  viewOrder: number,
  disabled: boolean,
};

export type ModelProductConditionInput = {
  name?: ModelStringInput | null,
  unitPrice?: ModelIntInput | null,
  type?: ModelTypeInput | null,
  orderType?: ModelOrderTypeInput | null,
  viewOrder?: ModelIntInput | null,
  disabled?: ModelBooleanInput | null,
  and?: Array< ModelProductConditionInput | null > | null,
  or?: Array< ModelProductConditionInput | null > | null,
  not?: ModelProductConditionInput | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateProductInput = {
  id: string,
  name?: string | null,
  unitPrice?: number | null,
  type?: Type | null,
  orderType?: OrderType | null,
  viewOrder?: number | null,
  disabled?: boolean | null,
};

export type DeleteProductInput = {
  id: string,
};

export type CreateStaffInput = {
  id?: string | null,
  name: string,
  type: Type,
  viewOrder: number,
  disabled: boolean,
};

export type ModelStaffConditionInput = {
  name?: ModelStringInput | null,
  type?: ModelTypeInput | null,
  viewOrder?: ModelIntInput | null,
  disabled?: ModelBooleanInput | null,
  and?: Array< ModelStaffConditionInput | null > | null,
  or?: Array< ModelStaffConditionInput | null > | null,
  not?: ModelStaffConditionInput | null,
};

export type UpdateStaffInput = {
  id: string,
  name?: string | null,
  type?: Type | null,
  viewOrder?: number | null,
  disabled?: boolean | null,
};

export type DeleteStaffInput = {
  id: string,
};

export type ModelOrderFilterInput = {
  id?: ModelIDInput | null,
  type?: ModelTypeInput | null,
  orderType?: ModelOrderTypeInput | null,
  staffID?: ModelIDInput | null,
  deliveryStatus?: ModelDeliveryStatusInput | null,
  deliveryType?: ModelDeliveryTypeInput | null,
  deliveryStartYear?: ModelIntInput | null,
  deliveryStartMonth?: ModelIntInput | null,
  deliveryInterval?: ModelIntInput | null,
  deliveredAt?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelOrderFilterInput | null > | null,
  or?: Array< ModelOrderFilterInput | null > | null,
  not?: ModelOrderFilterInput | null,
};

export type ModelOrderConnection = {
  __typename: "ModelOrderConnection",
  items:  Array<Order | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionOrderFilterInput = {
  id?: ModelIDInput | null,
  staffID?: ModelIDInput | null,
  type?: ModelStringInput | null,
  deliveryStartYear?: ModelIntInput | null,
  deliveryStartMonth?: ModelIntInput | null,
  deliveryInterval?: ModelIntInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelSubscriptionOrderFilterInput | null > | null,
  or?: Array< ModelSubscriptionOrderFilterInput | null > | null,
  not?: ModelSubscriptionOrderFilterInput | null,
};

export type ModelSubscriptionOrderConnection = {
  __typename: "ModelSubscriptionOrderConnection",
  items:  Array<SubscriptionOrder | null >,
  nextToken?: string | null,
};

export type ModelProductFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  unitPrice?: ModelIntInput | null,
  type?: ModelTypeInput | null,
  orderType?: ModelOrderTypeInput | null,
  viewOrder?: ModelIntInput | null,
  disabled?: ModelBooleanInput | null,
  and?: Array< ModelProductFilterInput | null > | null,
  or?: Array< ModelProductFilterInput | null > | null,
  not?: ModelProductFilterInput | null,
};

export type ModelProductConnection = {
  __typename: "ModelProductConnection",
  items:  Array<Product | null >,
  nextToken?: string | null,
};

export type ModelStaffFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  type?: ModelTypeInput | null,
  viewOrder?: ModelIntInput | null,
  disabled?: ModelBooleanInput | null,
  and?: Array< ModelStaffFilterInput | null > | null,
  or?: Array< ModelStaffFilterInput | null > | null,
  not?: ModelStaffFilterInput | null,
};

export type ModelStaffConnection = {
  __typename: "ModelStaffConnection",
  items:  Array<Staff | null >,
  nextToken?: string | null,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelIntKeyConditionInput = {
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type CreateOrderMutationVariables = {
  input: CreateOrderInput,
  condition?: ModelOrderConditionInput | null,
};

export type CreateOrderMutation = {
  createOrder?:  {
    __typename: "Order",
    id: string,
    type: Type,
    orderType: OrderType,
    staffID: string,
    products?:  {
      __typename: "ModelOrderProductConnection",
      items:  Array< {
        __typename: "OrderProduct",
        id: string,
        orderID: string,
        productID: string,
        product:  {
          __typename: "Product",
          id: string,
          name: string,
          unitPrice: number,
          type: Type,
          orderType: OrderType,
          viewOrder: number,
          disabled: boolean,
          createdAt: string,
          updatedAt: string,
        },
        quantity: number,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    staff:  {
      __typename: "Staff",
      id: string,
      name: string,
      type: Type,
      viewOrder: number,
      disabled: boolean,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    deliveryStatus?: DeliveryStatus | null,
    deliveryType?: DeliveryType | null,
    deliveryStartYear?: number | null,
    deliveryStartMonth?: number | null,
    deliveryInterval?: number | null,
    deliveredAt?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateOrderMutationVariables = {
  input: UpdateOrderInput,
  condition?: ModelOrderConditionInput | null,
};

export type UpdateOrderMutation = {
  updateOrder?:  {
    __typename: "Order",
    id: string,
    type: Type,
    orderType: OrderType,
    staffID: string,
    products?:  {
      __typename: "ModelOrderProductConnection",
      items:  Array< {
        __typename: "OrderProduct",
        id: string,
        orderID: string,
        productID: string,
        product:  {
          __typename: "Product",
          id: string,
          name: string,
          unitPrice: number,
          type: Type,
          orderType: OrderType,
          viewOrder: number,
          disabled: boolean,
          createdAt: string,
          updatedAt: string,
        },
        quantity: number,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    staff:  {
      __typename: "Staff",
      id: string,
      name: string,
      type: Type,
      viewOrder: number,
      disabled: boolean,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    deliveryStatus?: DeliveryStatus | null,
    deliveryType?: DeliveryType | null,
    deliveryStartYear?: number | null,
    deliveryStartMonth?: number | null,
    deliveryInterval?: number | null,
    deliveredAt?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteOrderMutationVariables = {
  input: DeleteOrderInput,
  condition?: ModelOrderConditionInput | null,
};

export type DeleteOrderMutation = {
  deleteOrder?:  {
    __typename: "Order",
    id: string,
    type: Type,
    orderType: OrderType,
    staffID: string,
    products?:  {
      __typename: "ModelOrderProductConnection",
      items:  Array< {
        __typename: "OrderProduct",
        id: string,
        orderID: string,
        productID: string,
        product:  {
          __typename: "Product",
          id: string,
          name: string,
          unitPrice: number,
          type: Type,
          orderType: OrderType,
          viewOrder: number,
          disabled: boolean,
          createdAt: string,
          updatedAt: string,
        },
        quantity: number,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    staff:  {
      __typename: "Staff",
      id: string,
      name: string,
      type: Type,
      viewOrder: number,
      disabled: boolean,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    deliveryStatus?: DeliveryStatus | null,
    deliveryType?: DeliveryType | null,
    deliveryStartYear?: number | null,
    deliveryStartMonth?: number | null,
    deliveryInterval?: number | null,
    deliveredAt?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateOrderProductMutationVariables = {
  input: CreateOrderProductInput,
  condition?: ModelOrderProductConditionInput | null,
};

export type CreateOrderProductMutation = {
  createOrderProduct?:  {
    __typename: "OrderProduct",
    id: string,
    orderID: string,
    productID: string,
    product:  {
      __typename: "Product",
      id: string,
      name: string,
      unitPrice: number,
      type: Type,
      orderType: OrderType,
      viewOrder: number,
      disabled: boolean,
      createdAt: string,
      updatedAt: string,
    },
    quantity: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateOrderProductMutationVariables = {
  input: UpdateOrderProductInput,
  condition?: ModelOrderProductConditionInput | null,
};

export type UpdateOrderProductMutation = {
  updateOrderProduct?:  {
    __typename: "OrderProduct",
    id: string,
    orderID: string,
    productID: string,
    product:  {
      __typename: "Product",
      id: string,
      name: string,
      unitPrice: number,
      type: Type,
      orderType: OrderType,
      viewOrder: number,
      disabled: boolean,
      createdAt: string,
      updatedAt: string,
    },
    quantity: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteOrderProductMutationVariables = {
  input: DeleteOrderProductInput,
  condition?: ModelOrderProductConditionInput | null,
};

export type DeleteOrderProductMutation = {
  deleteOrderProduct?:  {
    __typename: "OrderProduct",
    id: string,
    orderID: string,
    productID: string,
    product:  {
      __typename: "Product",
      id: string,
      name: string,
      unitPrice: number,
      type: Type,
      orderType: OrderType,
      viewOrder: number,
      disabled: boolean,
      createdAt: string,
      updatedAt: string,
    },
    quantity: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateSubscriptionOrderMutationVariables = {
  input: CreateSubscriptionOrderInput,
  condition?: ModelSubscriptionOrderConditionInput | null,
};

export type CreateSubscriptionOrderMutation = {
  createSubscriptionOrder?:  {
    __typename: "SubscriptionOrder",
    id: string,
    staffID: string,
    type: string,
    products?:  {
      __typename: "ModelSubscriptionOrderProductConnection",
      items:  Array< {
        __typename: "SubscriptionOrderProduct",
        id: string,
        subscriptionOrderID: string,
        productID: string,
        product:  {
          __typename: "Product",
          id: string,
          name: string,
          unitPrice: number,
          type: Type,
          orderType: OrderType,
          viewOrder: number,
          disabled: boolean,
          createdAt: string,
          updatedAt: string,
        },
        quantity: number,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    staff:  {
      __typename: "Staff",
      id: string,
      name: string,
      type: Type,
      viewOrder: number,
      disabled: boolean,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    deliveryStartYear: number,
    deliveryStartMonth: number,
    deliveryInterval: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateSubscriptionOrderMutationVariables = {
  input: UpdateSubscriptionOrderInput,
  condition?: ModelSubscriptionOrderConditionInput | null,
};

export type UpdateSubscriptionOrderMutation = {
  updateSubscriptionOrder?:  {
    __typename: "SubscriptionOrder",
    id: string,
    staffID: string,
    type: string,
    products?:  {
      __typename: "ModelSubscriptionOrderProductConnection",
      items:  Array< {
        __typename: "SubscriptionOrderProduct",
        id: string,
        subscriptionOrderID: string,
        productID: string,
        product:  {
          __typename: "Product",
          id: string,
          name: string,
          unitPrice: number,
          type: Type,
          orderType: OrderType,
          viewOrder: number,
          disabled: boolean,
          createdAt: string,
          updatedAt: string,
        },
        quantity: number,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    staff:  {
      __typename: "Staff",
      id: string,
      name: string,
      type: Type,
      viewOrder: number,
      disabled: boolean,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    deliveryStartYear: number,
    deliveryStartMonth: number,
    deliveryInterval: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteSubscriptionOrderMutationVariables = {
  input: DeleteSubscriptionOrderInput,
  condition?: ModelSubscriptionOrderConditionInput | null,
};

export type DeleteSubscriptionOrderMutation = {
  deleteSubscriptionOrder?:  {
    __typename: "SubscriptionOrder",
    id: string,
    staffID: string,
    type: string,
    products?:  {
      __typename: "ModelSubscriptionOrderProductConnection",
      items:  Array< {
        __typename: "SubscriptionOrderProduct",
        id: string,
        subscriptionOrderID: string,
        productID: string,
        product:  {
          __typename: "Product",
          id: string,
          name: string,
          unitPrice: number,
          type: Type,
          orderType: OrderType,
          viewOrder: number,
          disabled: boolean,
          createdAt: string,
          updatedAt: string,
        },
        quantity: number,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    staff:  {
      __typename: "Staff",
      id: string,
      name: string,
      type: Type,
      viewOrder: number,
      disabled: boolean,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    deliveryStartYear: number,
    deliveryStartMonth: number,
    deliveryInterval: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateSubscriptionOrderProductMutationVariables = {
  input: CreateSubscriptionOrderProductInput,
  condition?: ModelSubscriptionOrderProductConditionInput | null,
};

export type CreateSubscriptionOrderProductMutation = {
  createSubscriptionOrderProduct?:  {
    __typename: "SubscriptionOrderProduct",
    id: string,
    subscriptionOrderID: string,
    productID: string,
    product:  {
      __typename: "Product",
      id: string,
      name: string,
      unitPrice: number,
      type: Type,
      orderType: OrderType,
      viewOrder: number,
      disabled: boolean,
      createdAt: string,
      updatedAt: string,
    },
    quantity: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateSubscriptionOrderProductMutationVariables = {
  input: UpdateSubscriptionOrderProductInput,
  condition?: ModelSubscriptionOrderProductConditionInput | null,
};

export type UpdateSubscriptionOrderProductMutation = {
  updateSubscriptionOrderProduct?:  {
    __typename: "SubscriptionOrderProduct",
    id: string,
    subscriptionOrderID: string,
    productID: string,
    product:  {
      __typename: "Product",
      id: string,
      name: string,
      unitPrice: number,
      type: Type,
      orderType: OrderType,
      viewOrder: number,
      disabled: boolean,
      createdAt: string,
      updatedAt: string,
    },
    quantity: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteSubscriptionOrderProductMutationVariables = {
  input: DeleteSubscriptionOrderProductInput,
  condition?: ModelSubscriptionOrderProductConditionInput | null,
};

export type DeleteSubscriptionOrderProductMutation = {
  deleteSubscriptionOrderProduct?:  {
    __typename: "SubscriptionOrderProduct",
    id: string,
    subscriptionOrderID: string,
    productID: string,
    product:  {
      __typename: "Product",
      id: string,
      name: string,
      unitPrice: number,
      type: Type,
      orderType: OrderType,
      viewOrder: number,
      disabled: boolean,
      createdAt: string,
      updatedAt: string,
    },
    quantity: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateProductMutationVariables = {
  input: CreateProductInput,
  condition?: ModelProductConditionInput | null,
};

export type CreateProductMutation = {
  createProduct?:  {
    __typename: "Product",
    id: string,
    name: string,
    unitPrice: number,
    type: Type,
    orderType: OrderType,
    viewOrder: number,
    disabled: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateProductMutationVariables = {
  input: UpdateProductInput,
  condition?: ModelProductConditionInput | null,
};

export type UpdateProductMutation = {
  updateProduct?:  {
    __typename: "Product",
    id: string,
    name: string,
    unitPrice: number,
    type: Type,
    orderType: OrderType,
    viewOrder: number,
    disabled: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteProductMutationVariables = {
  input: DeleteProductInput,
  condition?: ModelProductConditionInput | null,
};

export type DeleteProductMutation = {
  deleteProduct?:  {
    __typename: "Product",
    id: string,
    name: string,
    unitPrice: number,
    type: Type,
    orderType: OrderType,
    viewOrder: number,
    disabled: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateStaffMutationVariables = {
  input: CreateStaffInput,
  condition?: ModelStaffConditionInput | null,
};

export type CreateStaffMutation = {
  createStaff?:  {
    __typename: "Staff",
    id: string,
    name: string,
    type: Type,
    viewOrder: number,
    disabled: boolean,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateStaffMutationVariables = {
  input: UpdateStaffInput,
  condition?: ModelStaffConditionInput | null,
};

export type UpdateStaffMutation = {
  updateStaff?:  {
    __typename: "Staff",
    id: string,
    name: string,
    type: Type,
    viewOrder: number,
    disabled: boolean,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteStaffMutationVariables = {
  input: DeleteStaffInput,
  condition?: ModelStaffConditionInput | null,
};

export type DeleteStaffMutation = {
  deleteStaff?:  {
    __typename: "Staff",
    id: string,
    name: string,
    type: Type,
    viewOrder: number,
    disabled: boolean,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type GetOrderQueryVariables = {
  id: string,
};

export type GetOrderQuery = {
  getOrder?:  {
    __typename: "Order",
    id: string,
    type: Type,
    orderType: OrderType,
    staffID: string,
    products?:  {
      __typename: "ModelOrderProductConnection",
      items:  Array< {
        __typename: "OrderProduct",
        id: string,
        orderID: string,
        productID: string,
        product:  {
          __typename: "Product",
          id: string,
          name: string,
          unitPrice: number,
          type: Type,
          orderType: OrderType,
          viewOrder: number,
          disabled: boolean,
          createdAt: string,
          updatedAt: string,
        },
        quantity: number,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    staff:  {
      __typename: "Staff",
      id: string,
      name: string,
      type: Type,
      viewOrder: number,
      disabled: boolean,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    deliveryStatus?: DeliveryStatus | null,
    deliveryType?: DeliveryType | null,
    deliveryStartYear?: number | null,
    deliveryStartMonth?: number | null,
    deliveryInterval?: number | null,
    deliveredAt?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListOrdersQueryVariables = {
  filter?: ModelOrderFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListOrdersQuery = {
  listOrders?:  {
    __typename: "ModelOrderConnection",
    items:  Array< {
      __typename: "Order",
      id: string,
      type: Type,
      orderType: OrderType,
      staffID: string,
      products?:  {
        __typename: "ModelOrderProductConnection",
        items:  Array< {
          __typename: "OrderProduct",
          id: string,
          orderID: string,
          productID: string,
          product:  {
            __typename: "Product",
            id: string,
            name: string,
            unitPrice: number,
            type: Type,
            orderType: OrderType,
            viewOrder: number,
            disabled: boolean,
            createdAt: string,
            updatedAt: string,
          },
          quantity: number,
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      staff:  {
        __typename: "Staff",
        id: string,
        name: string,
        type: Type,
        viewOrder: number,
        disabled: boolean,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      },
      deliveryStatus?: DeliveryStatus | null,
      deliveryType?: DeliveryType | null,
      deliveryStartYear?: number | null,
      deliveryStartMonth?: number | null,
      deliveryInterval?: number | null,
      deliveredAt?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetSubscriptionOrderQueryVariables = {
  id: string,
};

export type GetSubscriptionOrderQuery = {
  getSubscriptionOrder?:  {
    __typename: "SubscriptionOrder",
    id: string,
    staffID: string,
    type: string,
    products?:  {
      __typename: "ModelSubscriptionOrderProductConnection",
      items:  Array< {
        __typename: "SubscriptionOrderProduct",
        id: string,
        subscriptionOrderID: string,
        productID: string,
        product:  {
          __typename: "Product",
          id: string,
          name: string,
          unitPrice: number,
          type: Type,
          orderType: OrderType,
          viewOrder: number,
          disabled: boolean,
          createdAt: string,
          updatedAt: string,
        },
        quantity: number,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    staff:  {
      __typename: "Staff",
      id: string,
      name: string,
      type: Type,
      viewOrder: number,
      disabled: boolean,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    deliveryStartYear: number,
    deliveryStartMonth: number,
    deliveryInterval: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListSubscriptionOrdersQueryVariables = {
  filter?: ModelSubscriptionOrderFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSubscriptionOrdersQuery = {
  listSubscriptionOrders?:  {
    __typename: "ModelSubscriptionOrderConnection",
    items:  Array< {
      __typename: "SubscriptionOrder",
      id: string,
      staffID: string,
      type: string,
      products?:  {
        __typename: "ModelSubscriptionOrderProductConnection",
        items:  Array< {
          __typename: "SubscriptionOrderProduct",
          id: string,
          subscriptionOrderID: string,
          productID: string,
          product:  {
            __typename: "Product",
            id: string,
            name: string,
            unitPrice: number,
            type: Type,
            orderType: OrderType,
            viewOrder: number,
            disabled: boolean,
            createdAt: string,
            updatedAt: string,
          },
          quantity: number,
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      staff:  {
        __typename: "Staff",
        id: string,
        name: string,
        type: Type,
        viewOrder: number,
        disabled: boolean,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      },
      deliveryStartYear: number,
      deliveryStartMonth: number,
      deliveryInterval: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetProductQueryVariables = {
  id: string,
};

export type GetProductQuery = {
  getProduct?:  {
    __typename: "Product",
    id: string,
    name: string,
    unitPrice: number,
    type: Type,
    orderType: OrderType,
    viewOrder: number,
    disabled: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListProductsQueryVariables = {
  filter?: ModelProductFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListProductsQuery = {
  listProducts?:  {
    __typename: "ModelProductConnection",
    items:  Array< {
      __typename: "Product",
      id: string,
      name: string,
      unitPrice: number,
      type: Type,
      orderType: OrderType,
      viewOrder: number,
      disabled: boolean,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetStaffQueryVariables = {
  id: string,
};

export type GetStaffQuery = {
  getStaff?:  {
    __typename: "Staff",
    id: string,
    name: string,
    type: Type,
    viewOrder: number,
    disabled: boolean,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListStaffsQueryVariables = {
  filter?: ModelStaffFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListStaffsQuery = {
  listStaffs?:  {
    __typename: "ModelStaffConnection",
    items:  Array< {
      __typename: "Staff",
      id: string,
      name: string,
      type: Type,
      viewOrder: number,
      disabled: boolean,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListOrdersSortedByCreatedAtQueryVariables = {
  type?: Type | null,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelOrderFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListOrdersSortedByCreatedAtQuery = {
  listOrdersSortedByCreatedAt?:  {
    __typename: "ModelOrderConnection",
    items:  Array< {
      __typename: "Order",
      id: string,
      type: Type,
      orderType: OrderType,
      staffID: string,
      products?:  {
        __typename: "ModelOrderProductConnection",
        items:  Array< {
          __typename: "OrderProduct",
          id: string,
          orderID: string,
          productID: string,
          product:  {
            __typename: "Product",
            id: string,
            name: string,
            unitPrice: number,
            type: Type,
            orderType: OrderType,
            viewOrder: number,
            disabled: boolean,
            createdAt: string,
            updatedAt: string,
          },
          quantity: number,
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      staff:  {
        __typename: "Staff",
        id: string,
        name: string,
        type: Type,
        viewOrder: number,
        disabled: boolean,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      },
      deliveryStatus?: DeliveryStatus | null,
      deliveryType?: DeliveryType | null,
      deliveryStartYear?: number | null,
      deliveryStartMonth?: number | null,
      deliveryInterval?: number | null,
      deliveredAt?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListSubscriptionOrdersSortedByCreatedAtQueryVariables = {
  type?: string | null,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelSubscriptionOrderFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSubscriptionOrdersSortedByCreatedAtQuery = {
  listSubscriptionOrdersSortedByCreatedAt?:  {
    __typename: "ModelSubscriptionOrderConnection",
    items:  Array< {
      __typename: "SubscriptionOrder",
      id: string,
      staffID: string,
      type: string,
      products?:  {
        __typename: "ModelSubscriptionOrderProductConnection",
        items:  Array< {
          __typename: "SubscriptionOrderProduct",
          id: string,
          subscriptionOrderID: string,
          productID: string,
          product:  {
            __typename: "Product",
            id: string,
            name: string,
            unitPrice: number,
            type: Type,
            orderType: OrderType,
            viewOrder: number,
            disabled: boolean,
            createdAt: string,
            updatedAt: string,
          },
          quantity: number,
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      staff:  {
        __typename: "Staff",
        id: string,
        name: string,
        type: Type,
        viewOrder: number,
        disabled: boolean,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      },
      deliveryStartYear: number,
      deliveryStartMonth: number,
      deliveryInterval: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListProductsSortedByViewOrderQueryVariables = {
  type?: Type | null,
  viewOrder?: ModelIntKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelProductFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListProductsSortedByViewOrderQuery = {
  listProductsSortedByViewOrder?:  {
    __typename: "ModelProductConnection",
    items:  Array< {
      __typename: "Product",
      id: string,
      name: string,
      unitPrice: number,
      type: Type,
      orderType: OrderType,
      viewOrder: number,
      disabled: boolean,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListStaffsSortedByViewOrderQueryVariables = {
  type?: Type | null,
  viewOrder?: ModelIntKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelStaffFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListStaffsSortedByViewOrderQuery = {
  listStaffsSortedByViewOrder?:  {
    __typename: "ModelStaffConnection",
    items:  Array< {
      __typename: "Staff",
      id: string,
      name: string,
      type: Type,
      viewOrder: number,
      disabled: boolean,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateOrderSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateOrderSubscription = {
  onCreateOrder?:  {
    __typename: "Order",
    id: string,
    type: Type,
    orderType: OrderType,
    staffID: string,
    products?:  {
      __typename: "ModelOrderProductConnection",
      items:  Array< {
        __typename: "OrderProduct",
        id: string,
        orderID: string,
        productID: string,
        product:  {
          __typename: "Product",
          id: string,
          name: string,
          unitPrice: number,
          type: Type,
          orderType: OrderType,
          viewOrder: number,
          disabled: boolean,
          createdAt: string,
          updatedAt: string,
        },
        quantity: number,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    staff:  {
      __typename: "Staff",
      id: string,
      name: string,
      type: Type,
      viewOrder: number,
      disabled: boolean,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    deliveryStatus?: DeliveryStatus | null,
    deliveryType?: DeliveryType | null,
    deliveryStartYear?: number | null,
    deliveryStartMonth?: number | null,
    deliveryInterval?: number | null,
    deliveredAt?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateOrderSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateOrderSubscription = {
  onUpdateOrder?:  {
    __typename: "Order",
    id: string,
    type: Type,
    orderType: OrderType,
    staffID: string,
    products?:  {
      __typename: "ModelOrderProductConnection",
      items:  Array< {
        __typename: "OrderProduct",
        id: string,
        orderID: string,
        productID: string,
        product:  {
          __typename: "Product",
          id: string,
          name: string,
          unitPrice: number,
          type: Type,
          orderType: OrderType,
          viewOrder: number,
          disabled: boolean,
          createdAt: string,
          updatedAt: string,
        },
        quantity: number,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    staff:  {
      __typename: "Staff",
      id: string,
      name: string,
      type: Type,
      viewOrder: number,
      disabled: boolean,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    deliveryStatus?: DeliveryStatus | null,
    deliveryType?: DeliveryType | null,
    deliveryStartYear?: number | null,
    deliveryStartMonth?: number | null,
    deliveryInterval?: number | null,
    deliveredAt?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteOrderSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteOrderSubscription = {
  onDeleteOrder?:  {
    __typename: "Order",
    id: string,
    type: Type,
    orderType: OrderType,
    staffID: string,
    products?:  {
      __typename: "ModelOrderProductConnection",
      items:  Array< {
        __typename: "OrderProduct",
        id: string,
        orderID: string,
        productID: string,
        product:  {
          __typename: "Product",
          id: string,
          name: string,
          unitPrice: number,
          type: Type,
          orderType: OrderType,
          viewOrder: number,
          disabled: boolean,
          createdAt: string,
          updatedAt: string,
        },
        quantity: number,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    staff:  {
      __typename: "Staff",
      id: string,
      name: string,
      type: Type,
      viewOrder: number,
      disabled: boolean,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    deliveryStatus?: DeliveryStatus | null,
    deliveryType?: DeliveryType | null,
    deliveryStartYear?: number | null,
    deliveryStartMonth?: number | null,
    deliveryInterval?: number | null,
    deliveredAt?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateOrderProductSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateOrderProductSubscription = {
  onCreateOrderProduct?:  {
    __typename: "OrderProduct",
    id: string,
    orderID: string,
    productID: string,
    product:  {
      __typename: "Product",
      id: string,
      name: string,
      unitPrice: number,
      type: Type,
      orderType: OrderType,
      viewOrder: number,
      disabled: boolean,
      createdAt: string,
      updatedAt: string,
    },
    quantity: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateOrderProductSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateOrderProductSubscription = {
  onUpdateOrderProduct?:  {
    __typename: "OrderProduct",
    id: string,
    orderID: string,
    productID: string,
    product:  {
      __typename: "Product",
      id: string,
      name: string,
      unitPrice: number,
      type: Type,
      orderType: OrderType,
      viewOrder: number,
      disabled: boolean,
      createdAt: string,
      updatedAt: string,
    },
    quantity: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteOrderProductSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteOrderProductSubscription = {
  onDeleteOrderProduct?:  {
    __typename: "OrderProduct",
    id: string,
    orderID: string,
    productID: string,
    product:  {
      __typename: "Product",
      id: string,
      name: string,
      unitPrice: number,
      type: Type,
      orderType: OrderType,
      viewOrder: number,
      disabled: boolean,
      createdAt: string,
      updatedAt: string,
    },
    quantity: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateSubscriptionOrderSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateSubscriptionOrderSubscription = {
  onCreateSubscriptionOrder?:  {
    __typename: "SubscriptionOrder",
    id: string,
    staffID: string,
    type: string,
    products?:  {
      __typename: "ModelSubscriptionOrderProductConnection",
      items:  Array< {
        __typename: "SubscriptionOrderProduct",
        id: string,
        subscriptionOrderID: string,
        productID: string,
        product:  {
          __typename: "Product",
          id: string,
          name: string,
          unitPrice: number,
          type: Type,
          orderType: OrderType,
          viewOrder: number,
          disabled: boolean,
          createdAt: string,
          updatedAt: string,
        },
        quantity: number,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    staff:  {
      __typename: "Staff",
      id: string,
      name: string,
      type: Type,
      viewOrder: number,
      disabled: boolean,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    deliveryStartYear: number,
    deliveryStartMonth: number,
    deliveryInterval: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateSubscriptionOrderSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateSubscriptionOrderSubscription = {
  onUpdateSubscriptionOrder?:  {
    __typename: "SubscriptionOrder",
    id: string,
    staffID: string,
    type: string,
    products?:  {
      __typename: "ModelSubscriptionOrderProductConnection",
      items:  Array< {
        __typename: "SubscriptionOrderProduct",
        id: string,
        subscriptionOrderID: string,
        productID: string,
        product:  {
          __typename: "Product",
          id: string,
          name: string,
          unitPrice: number,
          type: Type,
          orderType: OrderType,
          viewOrder: number,
          disabled: boolean,
          createdAt: string,
          updatedAt: string,
        },
        quantity: number,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    staff:  {
      __typename: "Staff",
      id: string,
      name: string,
      type: Type,
      viewOrder: number,
      disabled: boolean,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    deliveryStartYear: number,
    deliveryStartMonth: number,
    deliveryInterval: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteSubscriptionOrderSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteSubscriptionOrderSubscription = {
  onDeleteSubscriptionOrder?:  {
    __typename: "SubscriptionOrder",
    id: string,
    staffID: string,
    type: string,
    products?:  {
      __typename: "ModelSubscriptionOrderProductConnection",
      items:  Array< {
        __typename: "SubscriptionOrderProduct",
        id: string,
        subscriptionOrderID: string,
        productID: string,
        product:  {
          __typename: "Product",
          id: string,
          name: string,
          unitPrice: number,
          type: Type,
          orderType: OrderType,
          viewOrder: number,
          disabled: boolean,
          createdAt: string,
          updatedAt: string,
        },
        quantity: number,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    staff:  {
      __typename: "Staff",
      id: string,
      name: string,
      type: Type,
      viewOrder: number,
      disabled: boolean,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    deliveryStartYear: number,
    deliveryStartMonth: number,
    deliveryInterval: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateSubscriptionOrderProductSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateSubscriptionOrderProductSubscription = {
  onCreateSubscriptionOrderProduct?:  {
    __typename: "SubscriptionOrderProduct",
    id: string,
    subscriptionOrderID: string,
    productID: string,
    product:  {
      __typename: "Product",
      id: string,
      name: string,
      unitPrice: number,
      type: Type,
      orderType: OrderType,
      viewOrder: number,
      disabled: boolean,
      createdAt: string,
      updatedAt: string,
    },
    quantity: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateSubscriptionOrderProductSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateSubscriptionOrderProductSubscription = {
  onUpdateSubscriptionOrderProduct?:  {
    __typename: "SubscriptionOrderProduct",
    id: string,
    subscriptionOrderID: string,
    productID: string,
    product:  {
      __typename: "Product",
      id: string,
      name: string,
      unitPrice: number,
      type: Type,
      orderType: OrderType,
      viewOrder: number,
      disabled: boolean,
      createdAt: string,
      updatedAt: string,
    },
    quantity: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteSubscriptionOrderProductSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteSubscriptionOrderProductSubscription = {
  onDeleteSubscriptionOrderProduct?:  {
    __typename: "SubscriptionOrderProduct",
    id: string,
    subscriptionOrderID: string,
    productID: string,
    product:  {
      __typename: "Product",
      id: string,
      name: string,
      unitPrice: number,
      type: Type,
      orderType: OrderType,
      viewOrder: number,
      disabled: boolean,
      createdAt: string,
      updatedAt: string,
    },
    quantity: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateProductSubscription = {
  onCreateProduct?:  {
    __typename: "Product",
    id: string,
    name: string,
    unitPrice: number,
    type: Type,
    orderType: OrderType,
    viewOrder: number,
    disabled: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateProductSubscription = {
  onUpdateProduct?:  {
    __typename: "Product",
    id: string,
    name: string,
    unitPrice: number,
    type: Type,
    orderType: OrderType,
    viewOrder: number,
    disabled: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteProductSubscription = {
  onDeleteProduct?:  {
    __typename: "Product",
    id: string,
    name: string,
    unitPrice: number,
    type: Type,
    orderType: OrderType,
    viewOrder: number,
    disabled: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateStaffSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateStaffSubscription = {
  onCreateStaff?:  {
    __typename: "Staff",
    id: string,
    name: string,
    type: Type,
    viewOrder: number,
    disabled: boolean,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateStaffSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateStaffSubscription = {
  onUpdateStaff?:  {
    __typename: "Staff",
    id: string,
    name: string,
    type: Type,
    viewOrder: number,
    disabled: boolean,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteStaffSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteStaffSubscription = {
  onDeleteStaff?:  {
    __typename: "Staff",
    id: string,
    name: string,
    type: Type,
    viewOrder: number,
    disabled: boolean,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};
