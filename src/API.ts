/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateClinicInput = {
  id?: string | null,
  name: string,
  phoneNumber: string,
  postalCode: string,
  state: string,
  city: string,
  address: string,
  building?: string | null,
  mailAddress: string,
};

export type ModelClinicConditionInput = {
  name?: ModelStringInput | null,
  phoneNumber?: ModelStringInput | null,
  postalCode?: ModelStringInput | null,
  state?: ModelStringInput | null,
  city?: ModelStringInput | null,
  address?: ModelStringInput | null,
  building?: ModelStringInput | null,
  mailAddress?: ModelStringInput | null,
  and?: Array< ModelClinicConditionInput | null > | null,
  or?: Array< ModelClinicConditionInput | null > | null,
  not?: ModelClinicConditionInput | null,
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

export type Clinic = {
  __typename: "Clinic",
  id: string,
  name: string,
  phoneNumber: string,
  postalCode: string,
  state: string,
  city: string,
  address: string,
  building?: string | null,
  mailAddress: string,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateClinicInput = {
  id: string,
  name?: string | null,
  phoneNumber?: string | null,
  postalCode?: string | null,
  state?: string | null,
  city?: string | null,
  address?: string | null,
  building?: string | null,
  mailAddress?: string | null,
};

export type DeleteClinicInput = {
  id: string,
};

export type CreateOrderInput = {
  id?: string | null,
  clinicID: string,
  staffID: string,
  deliveryStatus: DeliveryStatus,
  deliveryType: DeliveryType,
  deliveredAt?: string | null,
  createdAt?: string | null,
  note?: string | null,
  type: Type,
};

export enum DeliveryStatus {
  none = "none",
  ordered = "ordered",
  delivered = "delivered",
  canceled = "canceled",
}


export enum DeliveryType {
  regular = "regular",
  express = "express",
}


export enum Type {
  order = "order",
  subscriptionOrder = "subscriptionOrder",
  subscriptionOrderHistory = "subscriptionOrderHistory",
  product = "product",
  staff = "staff",
  clinic = "clinic",
}


export type ModelOrderConditionInput = {
  clinicID?: ModelIDInput | null,
  staffID?: ModelIDInput | null,
  deliveryStatus?: ModelDeliveryStatusInput | null,
  deliveryType?: ModelDeliveryTypeInput | null,
  deliveredAt?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  note?: ModelStringInput | null,
  type?: ModelTypeInput | null,
  and?: Array< ModelOrderConditionInput | null > | null,
  or?: Array< ModelOrderConditionInput | null > | null,
  not?: ModelOrderConditionInput | null,
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

export type ModelDeliveryStatusInput = {
  eq?: DeliveryStatus | null,
  ne?: DeliveryStatus | null,
};

export type ModelDeliveryTypeInput = {
  eq?: DeliveryType | null,
  ne?: DeliveryType | null,
};

export type ModelTypeInput = {
  eq?: Type | null,
  ne?: Type | null,
};

export type Order = {
  __typename: "Order",
  id: string,
  products?: ModelOrderProductConnection | null,
  clinicID: string,
  clinic: Clinic,
  staffID: string,
  staff: Staff,
  deliveryStatus: DeliveryStatus,
  deliveryType: DeliveryType,
  deliveredAt?: string | null,
  createdAt: string,
  note?: string | null,
  type: Type,
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
  name: string,
  purchasePrice: number,
  unitPrice: number,
  quantity: number,
  viewOrder: number,
  isExportCSV: boolean,
  bCartDeliveryGroupId?: number | null,
  bCartSetId?: number | null,
  isBCartSeparateDeliveryRoute?: boolean | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type Staff = {
  __typename: "Staff",
  id: string,
  firstName: string,
  lastName: string,
  viewOrder: number,
  disabled: boolean,
  type: Type,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateOrderInput = {
  id: string,
  clinicID?: string | null,
  staffID?: string | null,
  deliveryStatus?: DeliveryStatus | null,
  deliveryType?: DeliveryType | null,
  deliveredAt?: string | null,
  createdAt?: string | null,
  note?: string | null,
  type?: Type | null,
};

export type DeleteOrderInput = {
  id: string,
};

export type CreateOrderProductInput = {
  id?: string | null,
  orderID: string,
  name: string,
  purchasePrice: number,
  unitPrice: number,
  quantity: number,
  viewOrder: number,
  isExportCSV: boolean,
  bCartDeliveryGroupId?: number | null,
  bCartSetId?: number | null,
  isBCartSeparateDeliveryRoute?: boolean | null,
};

export type ModelOrderProductConditionInput = {
  orderID?: ModelIDInput | null,
  name?: ModelStringInput | null,
  purchasePrice?: ModelIntInput | null,
  unitPrice?: ModelIntInput | null,
  quantity?: ModelIntInput | null,
  viewOrder?: ModelIntInput | null,
  isExportCSV?: ModelBooleanInput | null,
  bCartDeliveryGroupId?: ModelIntInput | null,
  bCartSetId?: ModelIntInput | null,
  isBCartSeparateDeliveryRoute?: ModelBooleanInput | null,
  and?: Array< ModelOrderProductConditionInput | null > | null,
  or?: Array< ModelOrderProductConditionInput | null > | null,
  not?: ModelOrderProductConditionInput | null,
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

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateOrderProductInput = {
  id: string,
  orderID?: string | null,
  name?: string | null,
  purchasePrice?: number | null,
  unitPrice?: number | null,
  quantity?: number | null,
  viewOrder?: number | null,
  isExportCSV?: boolean | null,
  bCartDeliveryGroupId?: number | null,
  bCartSetId?: number | null,
  isBCartSeparateDeliveryRoute?: boolean | null,
};

export type DeleteOrderProductInput = {
  id: string,
};

export type CreateSubscriptionOrderInput = {
  id?: string | null,
  clinicID: string,
  staffID: string,
  deliveryStartYear: number,
  deliveryStartMonth: number,
  deliveryInterval: number,
  nextDeliveryYear?: number | null,
  nextDeliveryMonth?: number | null,
  lastDeliveredAt?: string | null,
  createdAt?: string | null,
  type: string,
  owner?: string | null,
};

export type ModelSubscriptionOrderConditionInput = {
  clinicID?: ModelIDInput | null,
  staffID?: ModelIDInput | null,
  deliveryStartYear?: ModelIntInput | null,
  deliveryStartMonth?: ModelIntInput | null,
  deliveryInterval?: ModelIntInput | null,
  nextDeliveryYear?: ModelIntInput | null,
  nextDeliveryMonth?: ModelIntInput | null,
  lastDeliveredAt?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  type?: ModelStringInput | null,
  owner?: ModelStringInput | null,
  and?: Array< ModelSubscriptionOrderConditionInput | null > | null,
  or?: Array< ModelSubscriptionOrderConditionInput | null > | null,
  not?: ModelSubscriptionOrderConditionInput | null,
};

export type SubscriptionOrder = {
  __typename: "SubscriptionOrder",
  id: string,
  products?: ModelSubscriptionOrderProductConnection | null,
  clinicID: string,
  clinic: Clinic,
  staffID: string,
  staff: Staff,
  deliveryStartYear: number,
  deliveryStartMonth: number,
  deliveryInterval: number,
  nextDeliveryYear?: number | null,
  nextDeliveryMonth?: number | null,
  lastDeliveredAt?: string | null,
  createdAt: string,
  type: string,
  owner?: string | null,
  updatedAt: string,
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

export type Product = {
  __typename: "Product",
  id: string,
  name: string,
  purchasePrice: number,
  unitPrice: number,
  orderType: OrderType,
  viewOrder: number,
  isExportCSV: boolean,
  bCartDeliveryGroupId?: number | null,
  bCartSetId?: number | null,
  isBCartSeparateDeliveryRoute?: boolean | null,
  disabled: boolean,
  type: Type,
  createdAt: string,
  updatedAt: string,
};

export enum OrderType {
  singleOrder = "singleOrder",
  subscriptionOrder = "subscriptionOrder",
  subscriptionOrderHistory = "subscriptionOrderHistory",
}


export type UpdateSubscriptionOrderInput = {
  id: string,
  clinicID?: string | null,
  staffID?: string | null,
  deliveryStartYear?: number | null,
  deliveryStartMonth?: number | null,
  deliveryInterval?: number | null,
  nextDeliveryYear?: number | null,
  nextDeliveryMonth?: number | null,
  lastDeliveredAt?: string | null,
  createdAt?: string | null,
  type?: string | null,
  owner?: string | null,
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

export type CreateSubscriptionOrderHistoryInput = {
  id?: string | null,
  clinicID: string,
  staffID: string,
  deliveryStartYear: number,
  deliveryStartMonth: number,
  deliveryInterval: number,
  nextDeliveryYear?: number | null,
  nextDeliveryMonth?: number | null,
  deliveredAt: string,
  createdAt?: string | null,
  note?: string | null,
  type: Type,
  owner?: string | null,
};

export type ModelSubscriptionOrderHistoryConditionInput = {
  clinicID?: ModelIDInput | null,
  staffID?: ModelIDInput | null,
  deliveryStartYear?: ModelIntInput | null,
  deliveryStartMonth?: ModelIntInput | null,
  deliveryInterval?: ModelIntInput | null,
  nextDeliveryYear?: ModelIntInput | null,
  nextDeliveryMonth?: ModelIntInput | null,
  deliveredAt?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  note?: ModelStringInput | null,
  type?: ModelTypeInput | null,
  owner?: ModelStringInput | null,
  and?: Array< ModelSubscriptionOrderHistoryConditionInput | null > | null,
  or?: Array< ModelSubscriptionOrderHistoryConditionInput | null > | null,
  not?: ModelSubscriptionOrderHistoryConditionInput | null,
};

export type SubscriptionOrderHistory = {
  __typename: "SubscriptionOrderHistory",
  id: string,
  products?: ModelSubscriptionOrderHistoryProductConnection | null,
  clinicID: string,
  clinic: Clinic,
  staffID: string,
  staff: Staff,
  deliveryStartYear: number,
  deliveryStartMonth: number,
  deliveryInterval: number,
  nextDeliveryYear?: number | null,
  nextDeliveryMonth?: number | null,
  deliveredAt: string,
  createdAt: string,
  note?: string | null,
  type: Type,
  owner?: string | null,
  updatedAt: string,
};

export type ModelSubscriptionOrderHistoryProductConnection = {
  __typename: "ModelSubscriptionOrderHistoryProductConnection",
  items:  Array<SubscriptionOrderHistoryProduct | null >,
  nextToken?: string | null,
};

export type SubscriptionOrderHistoryProduct = {
  __typename: "SubscriptionOrderHistoryProduct",
  id: string,
  orderID: string,
  name: string,
  purchasePrice: number,
  unitPrice: number,
  quantity: number,
  viewOrder: number,
  isExportCSV: boolean,
  owner?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateSubscriptionOrderHistoryInput = {
  id: string,
  clinicID?: string | null,
  staffID?: string | null,
  deliveryStartYear?: number | null,
  deliveryStartMonth?: number | null,
  deliveryInterval?: number | null,
  nextDeliveryYear?: number | null,
  nextDeliveryMonth?: number | null,
  deliveredAt?: string | null,
  createdAt?: string | null,
  note?: string | null,
  type?: Type | null,
  owner?: string | null,
};

export type DeleteSubscriptionOrderHistoryInput = {
  id: string,
};

export type CreateSubscriptionOrderHistoryProductInput = {
  id?: string | null,
  orderID: string,
  name: string,
  purchasePrice: number,
  unitPrice: number,
  quantity: number,
  viewOrder: number,
  isExportCSV: boolean,
  owner?: string | null,
};

export type ModelSubscriptionOrderHistoryProductConditionInput = {
  orderID?: ModelIDInput | null,
  name?: ModelStringInput | null,
  purchasePrice?: ModelIntInput | null,
  unitPrice?: ModelIntInput | null,
  quantity?: ModelIntInput | null,
  viewOrder?: ModelIntInput | null,
  isExportCSV?: ModelBooleanInput | null,
  owner?: ModelStringInput | null,
  and?: Array< ModelSubscriptionOrderHistoryProductConditionInput | null > | null,
  or?: Array< ModelSubscriptionOrderHistoryProductConditionInput | null > | null,
  not?: ModelSubscriptionOrderHistoryProductConditionInput | null,
};

export type UpdateSubscriptionOrderHistoryProductInput = {
  id: string,
  orderID?: string | null,
  name?: string | null,
  purchasePrice?: number | null,
  unitPrice?: number | null,
  quantity?: number | null,
  viewOrder?: number | null,
  isExportCSV?: boolean | null,
  owner?: string | null,
};

export type DeleteSubscriptionOrderHistoryProductInput = {
  id: string,
};

export type CreateProductInput = {
  id?: string | null,
  name: string,
  purchasePrice: number,
  unitPrice: number,
  orderType: OrderType,
  viewOrder: number,
  isExportCSV: boolean,
  bCartDeliveryGroupId?: number | null,
  bCartSetId?: number | null,
  isBCartSeparateDeliveryRoute?: boolean | null,
  disabled: boolean,
  type: Type,
};

export type ModelProductConditionInput = {
  name?: ModelStringInput | null,
  purchasePrice?: ModelIntInput | null,
  unitPrice?: ModelIntInput | null,
  orderType?: ModelOrderTypeInput | null,
  viewOrder?: ModelIntInput | null,
  isExportCSV?: ModelBooleanInput | null,
  bCartDeliveryGroupId?: ModelIntInput | null,
  bCartSetId?: ModelIntInput | null,
  isBCartSeparateDeliveryRoute?: ModelBooleanInput | null,
  disabled?: ModelBooleanInput | null,
  type?: ModelTypeInput | null,
  and?: Array< ModelProductConditionInput | null > | null,
  or?: Array< ModelProductConditionInput | null > | null,
  not?: ModelProductConditionInput | null,
};

export type ModelOrderTypeInput = {
  eq?: OrderType | null,
  ne?: OrderType | null,
};

export type UpdateProductInput = {
  id: string,
  name?: string | null,
  purchasePrice?: number | null,
  unitPrice?: number | null,
  orderType?: OrderType | null,
  viewOrder?: number | null,
  isExportCSV?: boolean | null,
  bCartDeliveryGroupId?: number | null,
  bCartSetId?: number | null,
  isBCartSeparateDeliveryRoute?: boolean | null,
  disabled?: boolean | null,
  type?: Type | null,
};

export type DeleteProductInput = {
  id: string,
};

export type CreateStaffInput = {
  id?: string | null,
  firstName: string,
  lastName: string,
  viewOrder: number,
  disabled: boolean,
  type: Type,
};

export type ModelStaffConditionInput = {
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  viewOrder?: ModelIntInput | null,
  disabled?: ModelBooleanInput | null,
  type?: ModelTypeInput | null,
  and?: Array< ModelStaffConditionInput | null > | null,
  or?: Array< ModelStaffConditionInput | null > | null,
  not?: ModelStaffConditionInput | null,
};

export type UpdateStaffInput = {
  id: string,
  firstName?: string | null,
  lastName?: string | null,
  viewOrder?: number | null,
  disabled?: boolean | null,
  type?: Type | null,
};

export type DeleteStaffInput = {
  id: string,
};

export type ModelClinicFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  phoneNumber?: ModelStringInput | null,
  postalCode?: ModelStringInput | null,
  state?: ModelStringInput | null,
  city?: ModelStringInput | null,
  address?: ModelStringInput | null,
  building?: ModelStringInput | null,
  mailAddress?: ModelStringInput | null,
  and?: Array< ModelClinicFilterInput | null > | null,
  or?: Array< ModelClinicFilterInput | null > | null,
  not?: ModelClinicFilterInput | null,
};

export type ModelClinicConnection = {
  __typename: "ModelClinicConnection",
  items:  Array<Clinic | null >,
  nextToken?: string | null,
};

export type ModelOrderFilterInput = {
  id?: ModelIDInput | null,
  clinicID?: ModelIDInput | null,
  staffID?: ModelIDInput | null,
  deliveryStatus?: ModelDeliveryStatusInput | null,
  deliveryType?: ModelDeliveryTypeInput | null,
  deliveredAt?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  note?: ModelStringInput | null,
  type?: ModelTypeInput | null,
  and?: Array< ModelOrderFilterInput | null > | null,
  or?: Array< ModelOrderFilterInput | null > | null,
  not?: ModelOrderFilterInput | null,
};

export type ModelOrderConnection = {
  __typename: "ModelOrderConnection",
  items:  Array<Order | null >,
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


export type ModelSubscriptionOrderFilterInput = {
  id?: ModelIDInput | null,
  clinicID?: ModelIDInput | null,
  staffID?: ModelIDInput | null,
  deliveryStartYear?: ModelIntInput | null,
  deliveryStartMonth?: ModelIntInput | null,
  deliveryInterval?: ModelIntInput | null,
  nextDeliveryYear?: ModelIntInput | null,
  nextDeliveryMonth?: ModelIntInput | null,
  lastDeliveredAt?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  type?: ModelStringInput | null,
  owner?: ModelStringInput | null,
  and?: Array< ModelSubscriptionOrderFilterInput | null > | null,
  or?: Array< ModelSubscriptionOrderFilterInput | null > | null,
  not?: ModelSubscriptionOrderFilterInput | null,
};

export type ModelSubscriptionOrderConnection = {
  __typename: "ModelSubscriptionOrderConnection",
  items:  Array<SubscriptionOrder | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionOrderHistoryFilterInput = {
  id?: ModelIDInput | null,
  clinicID?: ModelIDInput | null,
  staffID?: ModelIDInput | null,
  deliveryStartYear?: ModelIntInput | null,
  deliveryStartMonth?: ModelIntInput | null,
  deliveryInterval?: ModelIntInput | null,
  nextDeliveryYear?: ModelIntInput | null,
  nextDeliveryMonth?: ModelIntInput | null,
  deliveredAt?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  note?: ModelStringInput | null,
  type?: ModelTypeInput | null,
  owner?: ModelStringInput | null,
  and?: Array< ModelSubscriptionOrderHistoryFilterInput | null > | null,
  or?: Array< ModelSubscriptionOrderHistoryFilterInput | null > | null,
  not?: ModelSubscriptionOrderHistoryFilterInput | null,
};

export type ModelSubscriptionOrderHistoryConnection = {
  __typename: "ModelSubscriptionOrderHistoryConnection",
  items:  Array<SubscriptionOrderHistory | null >,
  nextToken?: string | null,
};

export type ModelProductFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  purchasePrice?: ModelIntInput | null,
  unitPrice?: ModelIntInput | null,
  orderType?: ModelOrderTypeInput | null,
  viewOrder?: ModelIntInput | null,
  isExportCSV?: ModelBooleanInput | null,
  bCartDeliveryGroupId?: ModelIntInput | null,
  bCartSetId?: ModelIntInput | null,
  isBCartSeparateDeliveryRoute?: ModelBooleanInput | null,
  disabled?: ModelBooleanInput | null,
  type?: ModelTypeInput | null,
  and?: Array< ModelProductFilterInput | null > | null,
  or?: Array< ModelProductFilterInput | null > | null,
  not?: ModelProductFilterInput | null,
};

export type ModelProductConnection = {
  __typename: "ModelProductConnection",
  items:  Array<Product | null >,
  nextToken?: string | null,
};

export type ModelIntKeyConditionInput = {
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelStaffFilterInput = {
  id?: ModelIDInput | null,
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  viewOrder?: ModelIntInput | null,
  disabled?: ModelBooleanInput | null,
  type?: ModelTypeInput | null,
  and?: Array< ModelStaffFilterInput | null > | null,
  or?: Array< ModelStaffFilterInput | null > | null,
  not?: ModelStaffFilterInput | null,
};

export type ModelStaffConnection = {
  __typename: "ModelStaffConnection",
  items:  Array<Staff | null >,
  nextToken?: string | null,
};

export type CurrentDate = {
  __typename: "CurrentDate",
  currentDate?: string | null,
};

export enum SendMailType {
  orderedSingleOrder = "orderedSingleOrder",
  orderedSubscriptionOrder = "orderedSubscriptionOrder",
  updatedSubscriptionOrder = "updatedSubscriptionOrder",
  canceledSingleOrder = "canceledSingleOrder",
  canceledSubscriptionOrder = "canceledSubscriptionOrder",
  deliveredSingleOrder = "deliveredSingleOrder",
  deliveredSubscriptionOrder = "deliveredSubscriptionOrder",
}


export type CreateClinicMutationVariables = {
  input: CreateClinicInput,
  condition?: ModelClinicConditionInput | null,
};

export type CreateClinicMutation = {
  createClinic?:  {
    __typename: "Clinic",
    id: string,
    name: string,
    phoneNumber: string,
    postalCode: string,
    state: string,
    city: string,
    address: string,
    building?: string | null,
    mailAddress: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateClinicMutationVariables = {
  input: UpdateClinicInput,
  condition?: ModelClinicConditionInput | null,
};

export type UpdateClinicMutation = {
  updateClinic?:  {
    __typename: "Clinic",
    id: string,
    name: string,
    phoneNumber: string,
    postalCode: string,
    state: string,
    city: string,
    address: string,
    building?: string | null,
    mailAddress: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteClinicMutationVariables = {
  input: DeleteClinicInput,
  condition?: ModelClinicConditionInput | null,
};

export type DeleteClinicMutation = {
  deleteClinic?:  {
    __typename: "Clinic",
    id: string,
    name: string,
    phoneNumber: string,
    postalCode: string,
    state: string,
    city: string,
    address: string,
    building?: string | null,
    mailAddress: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateOrderMutationVariables = {
  input: CreateOrderInput,
  condition?: ModelOrderConditionInput | null,
};

export type CreateOrderMutation = {
  createOrder?:  {
    __typename: "Order",
    id: string,
    products?:  {
      __typename: "ModelOrderProductConnection",
      items:  Array< {
        __typename: "OrderProduct",
        id: string,
        orderID: string,
        name: string,
        purchasePrice: number,
        unitPrice: number,
        quantity: number,
        viewOrder: number,
        isExportCSV: boolean,
        bCartDeliveryGroupId?: number | null,
        bCartSetId?: number | null,
        isBCartSeparateDeliveryRoute?: boolean | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    clinicID: string,
    clinic:  {
      __typename: "Clinic",
      id: string,
      name: string,
      phoneNumber: string,
      postalCode: string,
      state: string,
      city: string,
      address: string,
      building?: string | null,
      mailAddress: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    staffID: string,
    staff:  {
      __typename: "Staff",
      id: string,
      firstName: string,
      lastName: string,
      viewOrder: number,
      disabled: boolean,
      type: Type,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    deliveryStatus: DeliveryStatus,
    deliveryType: DeliveryType,
    deliveredAt?: string | null,
    createdAt: string,
    note?: string | null,
    type: Type,
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
    products?:  {
      __typename: "ModelOrderProductConnection",
      items:  Array< {
        __typename: "OrderProduct",
        id: string,
        orderID: string,
        name: string,
        purchasePrice: number,
        unitPrice: number,
        quantity: number,
        viewOrder: number,
        isExportCSV: boolean,
        bCartDeliveryGroupId?: number | null,
        bCartSetId?: number | null,
        isBCartSeparateDeliveryRoute?: boolean | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    clinicID: string,
    clinic:  {
      __typename: "Clinic",
      id: string,
      name: string,
      phoneNumber: string,
      postalCode: string,
      state: string,
      city: string,
      address: string,
      building?: string | null,
      mailAddress: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    staffID: string,
    staff:  {
      __typename: "Staff",
      id: string,
      firstName: string,
      lastName: string,
      viewOrder: number,
      disabled: boolean,
      type: Type,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    deliveryStatus: DeliveryStatus,
    deliveryType: DeliveryType,
    deliveredAt?: string | null,
    createdAt: string,
    note?: string | null,
    type: Type,
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
    products?:  {
      __typename: "ModelOrderProductConnection",
      items:  Array< {
        __typename: "OrderProduct",
        id: string,
        orderID: string,
        name: string,
        purchasePrice: number,
        unitPrice: number,
        quantity: number,
        viewOrder: number,
        isExportCSV: boolean,
        bCartDeliveryGroupId?: number | null,
        bCartSetId?: number | null,
        isBCartSeparateDeliveryRoute?: boolean | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    clinicID: string,
    clinic:  {
      __typename: "Clinic",
      id: string,
      name: string,
      phoneNumber: string,
      postalCode: string,
      state: string,
      city: string,
      address: string,
      building?: string | null,
      mailAddress: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    staffID: string,
    staff:  {
      __typename: "Staff",
      id: string,
      firstName: string,
      lastName: string,
      viewOrder: number,
      disabled: boolean,
      type: Type,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    deliveryStatus: DeliveryStatus,
    deliveryType: DeliveryType,
    deliveredAt?: string | null,
    createdAt: string,
    note?: string | null,
    type: Type,
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
    name: string,
    purchasePrice: number,
    unitPrice: number,
    quantity: number,
    viewOrder: number,
    isExportCSV: boolean,
    bCartDeliveryGroupId?: number | null,
    bCartSetId?: number | null,
    isBCartSeparateDeliveryRoute?: boolean | null,
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
    name: string,
    purchasePrice: number,
    unitPrice: number,
    quantity: number,
    viewOrder: number,
    isExportCSV: boolean,
    bCartDeliveryGroupId?: number | null,
    bCartSetId?: number | null,
    isBCartSeparateDeliveryRoute?: boolean | null,
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
    name: string,
    purchasePrice: number,
    unitPrice: number,
    quantity: number,
    viewOrder: number,
    isExportCSV: boolean,
    bCartDeliveryGroupId?: number | null,
    bCartSetId?: number | null,
    isBCartSeparateDeliveryRoute?: boolean | null,
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
          purchasePrice: number,
          unitPrice: number,
          orderType: OrderType,
          viewOrder: number,
          isExportCSV: boolean,
          bCartDeliveryGroupId?: number | null,
          bCartSetId?: number | null,
          isBCartSeparateDeliveryRoute?: boolean | null,
          disabled: boolean,
          type: Type,
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
    clinicID: string,
    clinic:  {
      __typename: "Clinic",
      id: string,
      name: string,
      phoneNumber: string,
      postalCode: string,
      state: string,
      city: string,
      address: string,
      building?: string | null,
      mailAddress: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    staffID: string,
    staff:  {
      __typename: "Staff",
      id: string,
      firstName: string,
      lastName: string,
      viewOrder: number,
      disabled: boolean,
      type: Type,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    deliveryStartYear: number,
    deliveryStartMonth: number,
    deliveryInterval: number,
    nextDeliveryYear?: number | null,
    nextDeliveryMonth?: number | null,
    lastDeliveredAt?: string | null,
    createdAt: string,
    type: string,
    owner?: string | null,
    updatedAt: string,
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
          purchasePrice: number,
          unitPrice: number,
          orderType: OrderType,
          viewOrder: number,
          isExportCSV: boolean,
          bCartDeliveryGroupId?: number | null,
          bCartSetId?: number | null,
          isBCartSeparateDeliveryRoute?: boolean | null,
          disabled: boolean,
          type: Type,
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
    clinicID: string,
    clinic:  {
      __typename: "Clinic",
      id: string,
      name: string,
      phoneNumber: string,
      postalCode: string,
      state: string,
      city: string,
      address: string,
      building?: string | null,
      mailAddress: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    staffID: string,
    staff:  {
      __typename: "Staff",
      id: string,
      firstName: string,
      lastName: string,
      viewOrder: number,
      disabled: boolean,
      type: Type,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    deliveryStartYear: number,
    deliveryStartMonth: number,
    deliveryInterval: number,
    nextDeliveryYear?: number | null,
    nextDeliveryMonth?: number | null,
    lastDeliveredAt?: string | null,
    createdAt: string,
    type: string,
    owner?: string | null,
    updatedAt: string,
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
          purchasePrice: number,
          unitPrice: number,
          orderType: OrderType,
          viewOrder: number,
          isExportCSV: boolean,
          bCartDeliveryGroupId?: number | null,
          bCartSetId?: number | null,
          isBCartSeparateDeliveryRoute?: boolean | null,
          disabled: boolean,
          type: Type,
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
    clinicID: string,
    clinic:  {
      __typename: "Clinic",
      id: string,
      name: string,
      phoneNumber: string,
      postalCode: string,
      state: string,
      city: string,
      address: string,
      building?: string | null,
      mailAddress: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    staffID: string,
    staff:  {
      __typename: "Staff",
      id: string,
      firstName: string,
      lastName: string,
      viewOrder: number,
      disabled: boolean,
      type: Type,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    deliveryStartYear: number,
    deliveryStartMonth: number,
    deliveryInterval: number,
    nextDeliveryYear?: number | null,
    nextDeliveryMonth?: number | null,
    lastDeliveredAt?: string | null,
    createdAt: string,
    type: string,
    owner?: string | null,
    updatedAt: string,
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
      purchasePrice: number,
      unitPrice: number,
      orderType: OrderType,
      viewOrder: number,
      isExportCSV: boolean,
      bCartDeliveryGroupId?: number | null,
      bCartSetId?: number | null,
      isBCartSeparateDeliveryRoute?: boolean | null,
      disabled: boolean,
      type: Type,
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
      purchasePrice: number,
      unitPrice: number,
      orderType: OrderType,
      viewOrder: number,
      isExportCSV: boolean,
      bCartDeliveryGroupId?: number | null,
      bCartSetId?: number | null,
      isBCartSeparateDeliveryRoute?: boolean | null,
      disabled: boolean,
      type: Type,
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
      purchasePrice: number,
      unitPrice: number,
      orderType: OrderType,
      viewOrder: number,
      isExportCSV: boolean,
      bCartDeliveryGroupId?: number | null,
      bCartSetId?: number | null,
      isBCartSeparateDeliveryRoute?: boolean | null,
      disabled: boolean,
      type: Type,
      createdAt: string,
      updatedAt: string,
    },
    quantity: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateSubscriptionOrderHistoryMutationVariables = {
  input: CreateSubscriptionOrderHistoryInput,
  condition?: ModelSubscriptionOrderHistoryConditionInput | null,
};

export type CreateSubscriptionOrderHistoryMutation = {
  createSubscriptionOrderHistory?:  {
    __typename: "SubscriptionOrderHistory",
    id: string,
    products?:  {
      __typename: "ModelSubscriptionOrderHistoryProductConnection",
      items:  Array< {
        __typename: "SubscriptionOrderHistoryProduct",
        id: string,
        orderID: string,
        name: string,
        purchasePrice: number,
        unitPrice: number,
        quantity: number,
        viewOrder: number,
        isExportCSV: boolean,
        owner?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    clinicID: string,
    clinic:  {
      __typename: "Clinic",
      id: string,
      name: string,
      phoneNumber: string,
      postalCode: string,
      state: string,
      city: string,
      address: string,
      building?: string | null,
      mailAddress: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    staffID: string,
    staff:  {
      __typename: "Staff",
      id: string,
      firstName: string,
      lastName: string,
      viewOrder: number,
      disabled: boolean,
      type: Type,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    deliveryStartYear: number,
    deliveryStartMonth: number,
    deliveryInterval: number,
    nextDeliveryYear?: number | null,
    nextDeliveryMonth?: number | null,
    deliveredAt: string,
    createdAt: string,
    note?: string | null,
    type: Type,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

export type UpdateSubscriptionOrderHistoryMutationVariables = {
  input: UpdateSubscriptionOrderHistoryInput,
  condition?: ModelSubscriptionOrderHistoryConditionInput | null,
};

export type UpdateSubscriptionOrderHistoryMutation = {
  updateSubscriptionOrderHistory?:  {
    __typename: "SubscriptionOrderHistory",
    id: string,
    products?:  {
      __typename: "ModelSubscriptionOrderHistoryProductConnection",
      items:  Array< {
        __typename: "SubscriptionOrderHistoryProduct",
        id: string,
        orderID: string,
        name: string,
        purchasePrice: number,
        unitPrice: number,
        quantity: number,
        viewOrder: number,
        isExportCSV: boolean,
        owner?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    clinicID: string,
    clinic:  {
      __typename: "Clinic",
      id: string,
      name: string,
      phoneNumber: string,
      postalCode: string,
      state: string,
      city: string,
      address: string,
      building?: string | null,
      mailAddress: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    staffID: string,
    staff:  {
      __typename: "Staff",
      id: string,
      firstName: string,
      lastName: string,
      viewOrder: number,
      disabled: boolean,
      type: Type,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    deliveryStartYear: number,
    deliveryStartMonth: number,
    deliveryInterval: number,
    nextDeliveryYear?: number | null,
    nextDeliveryMonth?: number | null,
    deliveredAt: string,
    createdAt: string,
    note?: string | null,
    type: Type,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

export type DeleteSubscriptionOrderHistoryMutationVariables = {
  input: DeleteSubscriptionOrderHistoryInput,
  condition?: ModelSubscriptionOrderHistoryConditionInput | null,
};

export type DeleteSubscriptionOrderHistoryMutation = {
  deleteSubscriptionOrderHistory?:  {
    __typename: "SubscriptionOrderHistory",
    id: string,
    products?:  {
      __typename: "ModelSubscriptionOrderHistoryProductConnection",
      items:  Array< {
        __typename: "SubscriptionOrderHistoryProduct",
        id: string,
        orderID: string,
        name: string,
        purchasePrice: number,
        unitPrice: number,
        quantity: number,
        viewOrder: number,
        isExportCSV: boolean,
        owner?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    clinicID: string,
    clinic:  {
      __typename: "Clinic",
      id: string,
      name: string,
      phoneNumber: string,
      postalCode: string,
      state: string,
      city: string,
      address: string,
      building?: string | null,
      mailAddress: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    staffID: string,
    staff:  {
      __typename: "Staff",
      id: string,
      firstName: string,
      lastName: string,
      viewOrder: number,
      disabled: boolean,
      type: Type,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    deliveryStartYear: number,
    deliveryStartMonth: number,
    deliveryInterval: number,
    nextDeliveryYear?: number | null,
    nextDeliveryMonth?: number | null,
    deliveredAt: string,
    createdAt: string,
    note?: string | null,
    type: Type,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

export type CreateSubscriptionOrderHistoryProductMutationVariables = {
  input: CreateSubscriptionOrderHistoryProductInput,
  condition?: ModelSubscriptionOrderHistoryProductConditionInput | null,
};

export type CreateSubscriptionOrderHistoryProductMutation = {
  createSubscriptionOrderHistoryProduct?:  {
    __typename: "SubscriptionOrderHistoryProduct",
    id: string,
    orderID: string,
    name: string,
    purchasePrice: number,
    unitPrice: number,
    quantity: number,
    viewOrder: number,
    isExportCSV: boolean,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateSubscriptionOrderHistoryProductMutationVariables = {
  input: UpdateSubscriptionOrderHistoryProductInput,
  condition?: ModelSubscriptionOrderHistoryProductConditionInput | null,
};

export type UpdateSubscriptionOrderHistoryProductMutation = {
  updateSubscriptionOrderHistoryProduct?:  {
    __typename: "SubscriptionOrderHistoryProduct",
    id: string,
    orderID: string,
    name: string,
    purchasePrice: number,
    unitPrice: number,
    quantity: number,
    viewOrder: number,
    isExportCSV: boolean,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteSubscriptionOrderHistoryProductMutationVariables = {
  input: DeleteSubscriptionOrderHistoryProductInput,
  condition?: ModelSubscriptionOrderHistoryProductConditionInput | null,
};

export type DeleteSubscriptionOrderHistoryProductMutation = {
  deleteSubscriptionOrderHistoryProduct?:  {
    __typename: "SubscriptionOrderHistoryProduct",
    id: string,
    orderID: string,
    name: string,
    purchasePrice: number,
    unitPrice: number,
    quantity: number,
    viewOrder: number,
    isExportCSV: boolean,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
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
    purchasePrice: number,
    unitPrice: number,
    orderType: OrderType,
    viewOrder: number,
    isExportCSV: boolean,
    bCartDeliveryGroupId?: number | null,
    bCartSetId?: number | null,
    isBCartSeparateDeliveryRoute?: boolean | null,
    disabled: boolean,
    type: Type,
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
    purchasePrice: number,
    unitPrice: number,
    orderType: OrderType,
    viewOrder: number,
    isExportCSV: boolean,
    bCartDeliveryGroupId?: number | null,
    bCartSetId?: number | null,
    isBCartSeparateDeliveryRoute?: boolean | null,
    disabled: boolean,
    type: Type,
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
    purchasePrice: number,
    unitPrice: number,
    orderType: OrderType,
    viewOrder: number,
    isExportCSV: boolean,
    bCartDeliveryGroupId?: number | null,
    bCartSetId?: number | null,
    isBCartSeparateDeliveryRoute?: boolean | null,
    disabled: boolean,
    type: Type,
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
    firstName: string,
    lastName: string,
    viewOrder: number,
    disabled: boolean,
    type: Type,
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
    firstName: string,
    lastName: string,
    viewOrder: number,
    disabled: boolean,
    type: Type,
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
    firstName: string,
    lastName: string,
    viewOrder: number,
    disabled: boolean,
    type: Type,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type GetClinicQueryVariables = {
  id: string,
};

export type GetClinicQuery = {
  getClinic?:  {
    __typename: "Clinic",
    id: string,
    name: string,
    phoneNumber: string,
    postalCode: string,
    state: string,
    city: string,
    address: string,
    building?: string | null,
    mailAddress: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListClinicsQueryVariables = {
  filter?: ModelClinicFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListClinicsQuery = {
  listClinics?:  {
    __typename: "ModelClinicConnection",
    items:  Array< {
      __typename: "Clinic",
      id: string,
      name: string,
      phoneNumber: string,
      postalCode: string,
      state: string,
      city: string,
      address: string,
      building?: string | null,
      mailAddress: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetOrderQueryVariables = {
  id: string,
};

export type GetOrderQuery = {
  getOrder?:  {
    __typename: "Order",
    id: string,
    products?:  {
      __typename: "ModelOrderProductConnection",
      items:  Array< {
        __typename: "OrderProduct",
        id: string,
        orderID: string,
        name: string,
        purchasePrice: number,
        unitPrice: number,
        quantity: number,
        viewOrder: number,
        isExportCSV: boolean,
        bCartDeliveryGroupId?: number | null,
        bCartSetId?: number | null,
        isBCartSeparateDeliveryRoute?: boolean | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    clinicID: string,
    clinic:  {
      __typename: "Clinic",
      id: string,
      name: string,
      phoneNumber: string,
      postalCode: string,
      state: string,
      city: string,
      address: string,
      building?: string | null,
      mailAddress: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    staffID: string,
    staff:  {
      __typename: "Staff",
      id: string,
      firstName: string,
      lastName: string,
      viewOrder: number,
      disabled: boolean,
      type: Type,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    deliveryStatus: DeliveryStatus,
    deliveryType: DeliveryType,
    deliveredAt?: string | null,
    createdAt: string,
    note?: string | null,
    type: Type,
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
      products?:  {
        __typename: "ModelOrderProductConnection",
        items:  Array< {
          __typename: "OrderProduct",
          id: string,
          orderID: string,
          name: string,
          purchasePrice: number,
          unitPrice: number,
          quantity: number,
          viewOrder: number,
          isExportCSV: boolean,
          bCartDeliveryGroupId?: number | null,
          bCartSetId?: number | null,
          isBCartSeparateDeliveryRoute?: boolean | null,
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      clinicID: string,
      clinic:  {
        __typename: "Clinic",
        id: string,
        name: string,
        phoneNumber: string,
        postalCode: string,
        state: string,
        city: string,
        address: string,
        building?: string | null,
        mailAddress: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      },
      staffID: string,
      staff:  {
        __typename: "Staff",
        id: string,
        firstName: string,
        lastName: string,
        viewOrder: number,
        disabled: boolean,
        type: Type,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      },
      deliveryStatus: DeliveryStatus,
      deliveryType: DeliveryType,
      deliveredAt?: string | null,
      createdAt: string,
      note?: string | null,
      type: Type,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListOrdersSortedByCreatedAtQueryVariables = {
  type: Type,
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
      products?:  {
        __typename: "ModelOrderProductConnection",
        items:  Array< {
          __typename: "OrderProduct",
          id: string,
          orderID: string,
          name: string,
          purchasePrice: number,
          unitPrice: number,
          quantity: number,
          viewOrder: number,
          isExportCSV: boolean,
          bCartDeliveryGroupId?: number | null,
          bCartSetId?: number | null,
          isBCartSeparateDeliveryRoute?: boolean | null,
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      clinicID: string,
      clinic:  {
        __typename: "Clinic",
        id: string,
        name: string,
        phoneNumber: string,
        postalCode: string,
        state: string,
        city: string,
        address: string,
        building?: string | null,
        mailAddress: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      },
      staffID: string,
      staff:  {
        __typename: "Staff",
        id: string,
        firstName: string,
        lastName: string,
        viewOrder: number,
        disabled: boolean,
        type: Type,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      },
      deliveryStatus: DeliveryStatus,
      deliveryType: DeliveryType,
      deliveredAt?: string | null,
      createdAt: string,
      note?: string | null,
      type: Type,
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
          purchasePrice: number,
          unitPrice: number,
          orderType: OrderType,
          viewOrder: number,
          isExportCSV: boolean,
          bCartDeliveryGroupId?: number | null,
          bCartSetId?: number | null,
          isBCartSeparateDeliveryRoute?: boolean | null,
          disabled: boolean,
          type: Type,
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
    clinicID: string,
    clinic:  {
      __typename: "Clinic",
      id: string,
      name: string,
      phoneNumber: string,
      postalCode: string,
      state: string,
      city: string,
      address: string,
      building?: string | null,
      mailAddress: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    staffID: string,
    staff:  {
      __typename: "Staff",
      id: string,
      firstName: string,
      lastName: string,
      viewOrder: number,
      disabled: boolean,
      type: Type,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    deliveryStartYear: number,
    deliveryStartMonth: number,
    deliveryInterval: number,
    nextDeliveryYear?: number | null,
    nextDeliveryMonth?: number | null,
    lastDeliveredAt?: string | null,
    createdAt: string,
    type: string,
    owner?: string | null,
    updatedAt: string,
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
            purchasePrice: number,
            unitPrice: number,
            orderType: OrderType,
            viewOrder: number,
            isExportCSV: boolean,
            bCartDeliveryGroupId?: number | null,
            bCartSetId?: number | null,
            isBCartSeparateDeliveryRoute?: boolean | null,
            disabled: boolean,
            type: Type,
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
      clinicID: string,
      clinic:  {
        __typename: "Clinic",
        id: string,
        name: string,
        phoneNumber: string,
        postalCode: string,
        state: string,
        city: string,
        address: string,
        building?: string | null,
        mailAddress: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      },
      staffID: string,
      staff:  {
        __typename: "Staff",
        id: string,
        firstName: string,
        lastName: string,
        viewOrder: number,
        disabled: boolean,
        type: Type,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      },
      deliveryStartYear: number,
      deliveryStartMonth: number,
      deliveryInterval: number,
      nextDeliveryYear?: number | null,
      nextDeliveryMonth?: number | null,
      lastDeliveredAt?: string | null,
      createdAt: string,
      type: string,
      owner?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListSubscriptionOrdersSortedByCreatedAtQueryVariables = {
  type: string,
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
            purchasePrice: number,
            unitPrice: number,
            orderType: OrderType,
            viewOrder: number,
            isExportCSV: boolean,
            bCartDeliveryGroupId?: number | null,
            bCartSetId?: number | null,
            isBCartSeparateDeliveryRoute?: boolean | null,
            disabled: boolean,
            type: Type,
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
      clinicID: string,
      clinic:  {
        __typename: "Clinic",
        id: string,
        name: string,
        phoneNumber: string,
        postalCode: string,
        state: string,
        city: string,
        address: string,
        building?: string | null,
        mailAddress: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      },
      staffID: string,
      staff:  {
        __typename: "Staff",
        id: string,
        firstName: string,
        lastName: string,
        viewOrder: number,
        disabled: boolean,
        type: Type,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      },
      deliveryStartYear: number,
      deliveryStartMonth: number,
      deliveryInterval: number,
      nextDeliveryYear?: number | null,
      nextDeliveryMonth?: number | null,
      lastDeliveredAt?: string | null,
      createdAt: string,
      type: string,
      owner?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetSubscriptionOrderHistoryQueryVariables = {
  id: string,
};

export type GetSubscriptionOrderHistoryQuery = {
  getSubscriptionOrderHistory?:  {
    __typename: "SubscriptionOrderHistory",
    id: string,
    products?:  {
      __typename: "ModelSubscriptionOrderHistoryProductConnection",
      items:  Array< {
        __typename: "SubscriptionOrderHistoryProduct",
        id: string,
        orderID: string,
        name: string,
        purchasePrice: number,
        unitPrice: number,
        quantity: number,
        viewOrder: number,
        isExportCSV: boolean,
        owner?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    clinicID: string,
    clinic:  {
      __typename: "Clinic",
      id: string,
      name: string,
      phoneNumber: string,
      postalCode: string,
      state: string,
      city: string,
      address: string,
      building?: string | null,
      mailAddress: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    staffID: string,
    staff:  {
      __typename: "Staff",
      id: string,
      firstName: string,
      lastName: string,
      viewOrder: number,
      disabled: boolean,
      type: Type,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    deliveryStartYear: number,
    deliveryStartMonth: number,
    deliveryInterval: number,
    nextDeliveryYear?: number | null,
    nextDeliveryMonth?: number | null,
    deliveredAt: string,
    createdAt: string,
    note?: string | null,
    type: Type,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

export type ListSubscriptionOrderHistoriesQueryVariables = {
  filter?: ModelSubscriptionOrderHistoryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSubscriptionOrderHistoriesQuery = {
  listSubscriptionOrderHistories?:  {
    __typename: "ModelSubscriptionOrderHistoryConnection",
    items:  Array< {
      __typename: "SubscriptionOrderHistory",
      id: string,
      products?:  {
        __typename: "ModelSubscriptionOrderHistoryProductConnection",
        items:  Array< {
          __typename: "SubscriptionOrderHistoryProduct",
          id: string,
          orderID: string,
          name: string,
          purchasePrice: number,
          unitPrice: number,
          quantity: number,
          viewOrder: number,
          isExportCSV: boolean,
          owner?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      clinicID: string,
      clinic:  {
        __typename: "Clinic",
        id: string,
        name: string,
        phoneNumber: string,
        postalCode: string,
        state: string,
        city: string,
        address: string,
        building?: string | null,
        mailAddress: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      },
      staffID: string,
      staff:  {
        __typename: "Staff",
        id: string,
        firstName: string,
        lastName: string,
        viewOrder: number,
        disabled: boolean,
        type: Type,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      },
      deliveryStartYear: number,
      deliveryStartMonth: number,
      deliveryInterval: number,
      nextDeliveryYear?: number | null,
      nextDeliveryMonth?: number | null,
      deliveredAt: string,
      createdAt: string,
      note?: string | null,
      type: Type,
      owner?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListSubscriptionOrderHistoriesSortedByCreatedAtQueryVariables = {
  type: Type,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelSubscriptionOrderHistoryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSubscriptionOrderHistoriesSortedByCreatedAtQuery = {
  listSubscriptionOrderHistoriesSortedByCreatedAt?:  {
    __typename: "ModelSubscriptionOrderHistoryConnection",
    items:  Array< {
      __typename: "SubscriptionOrderHistory",
      id: string,
      products?:  {
        __typename: "ModelSubscriptionOrderHistoryProductConnection",
        items:  Array< {
          __typename: "SubscriptionOrderHistoryProduct",
          id: string,
          orderID: string,
          name: string,
          purchasePrice: number,
          unitPrice: number,
          quantity: number,
          viewOrder: number,
          isExportCSV: boolean,
          owner?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      clinicID: string,
      clinic:  {
        __typename: "Clinic",
        id: string,
        name: string,
        phoneNumber: string,
        postalCode: string,
        state: string,
        city: string,
        address: string,
        building?: string | null,
        mailAddress: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      },
      staffID: string,
      staff:  {
        __typename: "Staff",
        id: string,
        firstName: string,
        lastName: string,
        viewOrder: number,
        disabled: boolean,
        type: Type,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      },
      deliveryStartYear: number,
      deliveryStartMonth: number,
      deliveryInterval: number,
      nextDeliveryYear?: number | null,
      nextDeliveryMonth?: number | null,
      deliveredAt: string,
      createdAt: string,
      note?: string | null,
      type: Type,
      owner?: string | null,
      updatedAt: string,
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
    purchasePrice: number,
    unitPrice: number,
    orderType: OrderType,
    viewOrder: number,
    isExportCSV: boolean,
    bCartDeliveryGroupId?: number | null,
    bCartSetId?: number | null,
    isBCartSeparateDeliveryRoute?: boolean | null,
    disabled: boolean,
    type: Type,
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
      purchasePrice: number,
      unitPrice: number,
      orderType: OrderType,
      viewOrder: number,
      isExportCSV: boolean,
      bCartDeliveryGroupId?: number | null,
      bCartSetId?: number | null,
      isBCartSeparateDeliveryRoute?: boolean | null,
      disabled: boolean,
      type: Type,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListProductsSortedByViewOrderQueryVariables = {
  type: Type,
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
      purchasePrice: number,
      unitPrice: number,
      orderType: OrderType,
      viewOrder: number,
      isExportCSV: boolean,
      bCartDeliveryGroupId?: number | null,
      bCartSetId?: number | null,
      isBCartSeparateDeliveryRoute?: boolean | null,
      disabled: boolean,
      type: Type,
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
    firstName: string,
    lastName: string,
    viewOrder: number,
    disabled: boolean,
    type: Type,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListStaffQueryVariables = {
  filter?: ModelStaffFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListStaffQuery = {
  listStaff?:  {
    __typename: "ModelStaffConnection",
    items:  Array< {
      __typename: "Staff",
      id: string,
      firstName: string,
      lastName: string,
      viewOrder: number,
      disabled: boolean,
      type: Type,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListStaffSortedByViewOrderQueryVariables = {
  type: Type,
  viewOrder?: ModelIntKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelStaffFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListStaffSortedByViewOrderQuery = {
  listStaffSortedByViewOrder?:  {
    __typename: "ModelStaffConnection",
    items:  Array< {
      __typename: "Staff",
      id: string,
      firstName: string,
      lastName: string,
      viewOrder: number,
      disabled: boolean,
      type: Type,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListSubscriptionOrdersContainedNextDeliveryDateQuery = {
  listSubscriptionOrdersContainedNextDeliveryDate?:  Array< {
    __typename: "SubscriptionOrder",
    id: string,
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
          purchasePrice: number,
          unitPrice: number,
          orderType: OrderType,
          viewOrder: number,
          isExportCSV: boolean,
          bCartDeliveryGroupId?: number | null,
          bCartSetId?: number | null,
          isBCartSeparateDeliveryRoute?: boolean | null,
          disabled: boolean,
          type: Type,
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
    clinicID: string,
    clinic:  {
      __typename: "Clinic",
      id: string,
      name: string,
      phoneNumber: string,
      postalCode: string,
      state: string,
      city: string,
      address: string,
      building?: string | null,
      mailAddress: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    staffID: string,
    staff:  {
      __typename: "Staff",
      id: string,
      firstName: string,
      lastName: string,
      viewOrder: number,
      disabled: boolean,
      type: Type,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    deliveryStartYear: number,
    deliveryStartMonth: number,
    deliveryInterval: number,
    nextDeliveryYear?: number | null,
    nextDeliveryMonth?: number | null,
    lastDeliveredAt?: string | null,
    createdAt: string,
    type: string,
    owner?: string | null,
    updatedAt: string,
  } | null > | null,
};

export type GetCurrentDateQuery = {
  getCurrentDate?:  {
    __typename: "CurrentDate",
    currentDate?: string | null,
  } | null,
};

export type SendOrderMailQueryVariables = {
  toAddresses: Array< string >,
  sendMailType: SendMailType,
  products: Array< string >,
  subtotal: number,
  tax: number,
  total: number,
  clinicName: string,
  phoneNumber: string,
  postalCode: string,
  state: string,
  city: string,
  address: string,
  building?: string | null,
  staffName: string,
  deliveryType?: DeliveryType | null,
  deliveryStartYear?: number | null,
  deliveryStartMonth?: number | null,
  deliveryInterval?: number | null,
};

export type SendOrderMailQuery = {
  sendOrderMail?: string | null,
};

export type SendErrorMailQueryVariables = {
  toAddress: string,
  subject: string,
  body: string,
};

export type SendErrorMailQuery = {
  sendErrorMail?: string | null,
};

export type OnCreateClinicSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateClinicSubscription = {
  onCreateClinic?:  {
    __typename: "Clinic",
    id: string,
    name: string,
    phoneNumber: string,
    postalCode: string,
    state: string,
    city: string,
    address: string,
    building?: string | null,
    mailAddress: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateClinicSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateClinicSubscription = {
  onUpdateClinic?:  {
    __typename: "Clinic",
    id: string,
    name: string,
    phoneNumber: string,
    postalCode: string,
    state: string,
    city: string,
    address: string,
    building?: string | null,
    mailAddress: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteClinicSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteClinicSubscription = {
  onDeleteClinic?:  {
    __typename: "Clinic",
    id: string,
    name: string,
    phoneNumber: string,
    postalCode: string,
    state: string,
    city: string,
    address: string,
    building?: string | null,
    mailAddress: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateOrderSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateOrderSubscription = {
  onCreateOrder?:  {
    __typename: "Order",
    id: string,
    products?:  {
      __typename: "ModelOrderProductConnection",
      items:  Array< {
        __typename: "OrderProduct",
        id: string,
        orderID: string,
        name: string,
        purchasePrice: number,
        unitPrice: number,
        quantity: number,
        viewOrder: number,
        isExportCSV: boolean,
        bCartDeliveryGroupId?: number | null,
        bCartSetId?: number | null,
        isBCartSeparateDeliveryRoute?: boolean | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    clinicID: string,
    clinic:  {
      __typename: "Clinic",
      id: string,
      name: string,
      phoneNumber: string,
      postalCode: string,
      state: string,
      city: string,
      address: string,
      building?: string | null,
      mailAddress: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    staffID: string,
    staff:  {
      __typename: "Staff",
      id: string,
      firstName: string,
      lastName: string,
      viewOrder: number,
      disabled: boolean,
      type: Type,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    deliveryStatus: DeliveryStatus,
    deliveryType: DeliveryType,
    deliveredAt?: string | null,
    createdAt: string,
    note?: string | null,
    type: Type,
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
    products?:  {
      __typename: "ModelOrderProductConnection",
      items:  Array< {
        __typename: "OrderProduct",
        id: string,
        orderID: string,
        name: string,
        purchasePrice: number,
        unitPrice: number,
        quantity: number,
        viewOrder: number,
        isExportCSV: boolean,
        bCartDeliveryGroupId?: number | null,
        bCartSetId?: number | null,
        isBCartSeparateDeliveryRoute?: boolean | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    clinicID: string,
    clinic:  {
      __typename: "Clinic",
      id: string,
      name: string,
      phoneNumber: string,
      postalCode: string,
      state: string,
      city: string,
      address: string,
      building?: string | null,
      mailAddress: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    staffID: string,
    staff:  {
      __typename: "Staff",
      id: string,
      firstName: string,
      lastName: string,
      viewOrder: number,
      disabled: boolean,
      type: Type,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    deliveryStatus: DeliveryStatus,
    deliveryType: DeliveryType,
    deliveredAt?: string | null,
    createdAt: string,
    note?: string | null,
    type: Type,
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
    products?:  {
      __typename: "ModelOrderProductConnection",
      items:  Array< {
        __typename: "OrderProduct",
        id: string,
        orderID: string,
        name: string,
        purchasePrice: number,
        unitPrice: number,
        quantity: number,
        viewOrder: number,
        isExportCSV: boolean,
        bCartDeliveryGroupId?: number | null,
        bCartSetId?: number | null,
        isBCartSeparateDeliveryRoute?: boolean | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    clinicID: string,
    clinic:  {
      __typename: "Clinic",
      id: string,
      name: string,
      phoneNumber: string,
      postalCode: string,
      state: string,
      city: string,
      address: string,
      building?: string | null,
      mailAddress: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    staffID: string,
    staff:  {
      __typename: "Staff",
      id: string,
      firstName: string,
      lastName: string,
      viewOrder: number,
      disabled: boolean,
      type: Type,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    deliveryStatus: DeliveryStatus,
    deliveryType: DeliveryType,
    deliveredAt?: string | null,
    createdAt: string,
    note?: string | null,
    type: Type,
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
    name: string,
    purchasePrice: number,
    unitPrice: number,
    quantity: number,
    viewOrder: number,
    isExportCSV: boolean,
    bCartDeliveryGroupId?: number | null,
    bCartSetId?: number | null,
    isBCartSeparateDeliveryRoute?: boolean | null,
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
    name: string,
    purchasePrice: number,
    unitPrice: number,
    quantity: number,
    viewOrder: number,
    isExportCSV: boolean,
    bCartDeliveryGroupId?: number | null,
    bCartSetId?: number | null,
    isBCartSeparateDeliveryRoute?: boolean | null,
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
    name: string,
    purchasePrice: number,
    unitPrice: number,
    quantity: number,
    viewOrder: number,
    isExportCSV: boolean,
    bCartDeliveryGroupId?: number | null,
    bCartSetId?: number | null,
    isBCartSeparateDeliveryRoute?: boolean | null,
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
          purchasePrice: number,
          unitPrice: number,
          orderType: OrderType,
          viewOrder: number,
          isExportCSV: boolean,
          bCartDeliveryGroupId?: number | null,
          bCartSetId?: number | null,
          isBCartSeparateDeliveryRoute?: boolean | null,
          disabled: boolean,
          type: Type,
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
    clinicID: string,
    clinic:  {
      __typename: "Clinic",
      id: string,
      name: string,
      phoneNumber: string,
      postalCode: string,
      state: string,
      city: string,
      address: string,
      building?: string | null,
      mailAddress: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    staffID: string,
    staff:  {
      __typename: "Staff",
      id: string,
      firstName: string,
      lastName: string,
      viewOrder: number,
      disabled: boolean,
      type: Type,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    deliveryStartYear: number,
    deliveryStartMonth: number,
    deliveryInterval: number,
    nextDeliveryYear?: number | null,
    nextDeliveryMonth?: number | null,
    lastDeliveredAt?: string | null,
    createdAt: string,
    type: string,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateSubscriptionOrderSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateSubscriptionOrderSubscription = {
  onUpdateSubscriptionOrder?:  {
    __typename: "SubscriptionOrder",
    id: string,
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
          purchasePrice: number,
          unitPrice: number,
          orderType: OrderType,
          viewOrder: number,
          isExportCSV: boolean,
          bCartDeliveryGroupId?: number | null,
          bCartSetId?: number | null,
          isBCartSeparateDeliveryRoute?: boolean | null,
          disabled: boolean,
          type: Type,
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
    clinicID: string,
    clinic:  {
      __typename: "Clinic",
      id: string,
      name: string,
      phoneNumber: string,
      postalCode: string,
      state: string,
      city: string,
      address: string,
      building?: string | null,
      mailAddress: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    staffID: string,
    staff:  {
      __typename: "Staff",
      id: string,
      firstName: string,
      lastName: string,
      viewOrder: number,
      disabled: boolean,
      type: Type,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    deliveryStartYear: number,
    deliveryStartMonth: number,
    deliveryInterval: number,
    nextDeliveryYear?: number | null,
    nextDeliveryMonth?: number | null,
    lastDeliveredAt?: string | null,
    createdAt: string,
    type: string,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteSubscriptionOrderSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteSubscriptionOrderSubscription = {
  onDeleteSubscriptionOrder?:  {
    __typename: "SubscriptionOrder",
    id: string,
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
          purchasePrice: number,
          unitPrice: number,
          orderType: OrderType,
          viewOrder: number,
          isExportCSV: boolean,
          bCartDeliveryGroupId?: number | null,
          bCartSetId?: number | null,
          isBCartSeparateDeliveryRoute?: boolean | null,
          disabled: boolean,
          type: Type,
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
    clinicID: string,
    clinic:  {
      __typename: "Clinic",
      id: string,
      name: string,
      phoneNumber: string,
      postalCode: string,
      state: string,
      city: string,
      address: string,
      building?: string | null,
      mailAddress: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    staffID: string,
    staff:  {
      __typename: "Staff",
      id: string,
      firstName: string,
      lastName: string,
      viewOrder: number,
      disabled: boolean,
      type: Type,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    deliveryStartYear: number,
    deliveryStartMonth: number,
    deliveryInterval: number,
    nextDeliveryYear?: number | null,
    nextDeliveryMonth?: number | null,
    lastDeliveredAt?: string | null,
    createdAt: string,
    type: string,
    owner?: string | null,
    updatedAt: string,
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
      purchasePrice: number,
      unitPrice: number,
      orderType: OrderType,
      viewOrder: number,
      isExportCSV: boolean,
      bCartDeliveryGroupId?: number | null,
      bCartSetId?: number | null,
      isBCartSeparateDeliveryRoute?: boolean | null,
      disabled: boolean,
      type: Type,
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
      purchasePrice: number,
      unitPrice: number,
      orderType: OrderType,
      viewOrder: number,
      isExportCSV: boolean,
      bCartDeliveryGroupId?: number | null,
      bCartSetId?: number | null,
      isBCartSeparateDeliveryRoute?: boolean | null,
      disabled: boolean,
      type: Type,
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
      purchasePrice: number,
      unitPrice: number,
      orderType: OrderType,
      viewOrder: number,
      isExportCSV: boolean,
      bCartDeliveryGroupId?: number | null,
      bCartSetId?: number | null,
      isBCartSeparateDeliveryRoute?: boolean | null,
      disabled: boolean,
      type: Type,
      createdAt: string,
      updatedAt: string,
    },
    quantity: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateSubscriptionOrderHistorySubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateSubscriptionOrderHistorySubscription = {
  onCreateSubscriptionOrderHistory?:  {
    __typename: "SubscriptionOrderHistory",
    id: string,
    products?:  {
      __typename: "ModelSubscriptionOrderHistoryProductConnection",
      items:  Array< {
        __typename: "SubscriptionOrderHistoryProduct",
        id: string,
        orderID: string,
        name: string,
        purchasePrice: number,
        unitPrice: number,
        quantity: number,
        viewOrder: number,
        isExportCSV: boolean,
        owner?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    clinicID: string,
    clinic:  {
      __typename: "Clinic",
      id: string,
      name: string,
      phoneNumber: string,
      postalCode: string,
      state: string,
      city: string,
      address: string,
      building?: string | null,
      mailAddress: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    staffID: string,
    staff:  {
      __typename: "Staff",
      id: string,
      firstName: string,
      lastName: string,
      viewOrder: number,
      disabled: boolean,
      type: Type,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    deliveryStartYear: number,
    deliveryStartMonth: number,
    deliveryInterval: number,
    nextDeliveryYear?: number | null,
    nextDeliveryMonth?: number | null,
    deliveredAt: string,
    createdAt: string,
    note?: string | null,
    type: Type,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateSubscriptionOrderHistorySubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateSubscriptionOrderHistorySubscription = {
  onUpdateSubscriptionOrderHistory?:  {
    __typename: "SubscriptionOrderHistory",
    id: string,
    products?:  {
      __typename: "ModelSubscriptionOrderHistoryProductConnection",
      items:  Array< {
        __typename: "SubscriptionOrderHistoryProduct",
        id: string,
        orderID: string,
        name: string,
        purchasePrice: number,
        unitPrice: number,
        quantity: number,
        viewOrder: number,
        isExportCSV: boolean,
        owner?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    clinicID: string,
    clinic:  {
      __typename: "Clinic",
      id: string,
      name: string,
      phoneNumber: string,
      postalCode: string,
      state: string,
      city: string,
      address: string,
      building?: string | null,
      mailAddress: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    staffID: string,
    staff:  {
      __typename: "Staff",
      id: string,
      firstName: string,
      lastName: string,
      viewOrder: number,
      disabled: boolean,
      type: Type,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    deliveryStartYear: number,
    deliveryStartMonth: number,
    deliveryInterval: number,
    nextDeliveryYear?: number | null,
    nextDeliveryMonth?: number | null,
    deliveredAt: string,
    createdAt: string,
    note?: string | null,
    type: Type,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteSubscriptionOrderHistorySubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteSubscriptionOrderHistorySubscription = {
  onDeleteSubscriptionOrderHistory?:  {
    __typename: "SubscriptionOrderHistory",
    id: string,
    products?:  {
      __typename: "ModelSubscriptionOrderHistoryProductConnection",
      items:  Array< {
        __typename: "SubscriptionOrderHistoryProduct",
        id: string,
        orderID: string,
        name: string,
        purchasePrice: number,
        unitPrice: number,
        quantity: number,
        viewOrder: number,
        isExportCSV: boolean,
        owner?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    clinicID: string,
    clinic:  {
      __typename: "Clinic",
      id: string,
      name: string,
      phoneNumber: string,
      postalCode: string,
      state: string,
      city: string,
      address: string,
      building?: string | null,
      mailAddress: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    staffID: string,
    staff:  {
      __typename: "Staff",
      id: string,
      firstName: string,
      lastName: string,
      viewOrder: number,
      disabled: boolean,
      type: Type,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    deliveryStartYear: number,
    deliveryStartMonth: number,
    deliveryInterval: number,
    nextDeliveryYear?: number | null,
    nextDeliveryMonth?: number | null,
    deliveredAt: string,
    createdAt: string,
    note?: string | null,
    type: Type,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

export type OnCreateSubscriptionOrderHistoryProductSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateSubscriptionOrderHistoryProductSubscription = {
  onCreateSubscriptionOrderHistoryProduct?:  {
    __typename: "SubscriptionOrderHistoryProduct",
    id: string,
    orderID: string,
    name: string,
    purchasePrice: number,
    unitPrice: number,
    quantity: number,
    viewOrder: number,
    isExportCSV: boolean,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateSubscriptionOrderHistoryProductSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateSubscriptionOrderHistoryProductSubscription = {
  onUpdateSubscriptionOrderHistoryProduct?:  {
    __typename: "SubscriptionOrderHistoryProduct",
    id: string,
    orderID: string,
    name: string,
    purchasePrice: number,
    unitPrice: number,
    quantity: number,
    viewOrder: number,
    isExportCSV: boolean,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteSubscriptionOrderHistoryProductSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteSubscriptionOrderHistoryProductSubscription = {
  onDeleteSubscriptionOrderHistoryProduct?:  {
    __typename: "SubscriptionOrderHistoryProduct",
    id: string,
    orderID: string,
    name: string,
    purchasePrice: number,
    unitPrice: number,
    quantity: number,
    viewOrder: number,
    isExportCSV: boolean,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateProductSubscription = {
  onCreateProduct?:  {
    __typename: "Product",
    id: string,
    name: string,
    purchasePrice: number,
    unitPrice: number,
    orderType: OrderType,
    viewOrder: number,
    isExportCSV: boolean,
    bCartDeliveryGroupId?: number | null,
    bCartSetId?: number | null,
    isBCartSeparateDeliveryRoute?: boolean | null,
    disabled: boolean,
    type: Type,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateProductSubscription = {
  onUpdateProduct?:  {
    __typename: "Product",
    id: string,
    name: string,
    purchasePrice: number,
    unitPrice: number,
    orderType: OrderType,
    viewOrder: number,
    isExportCSV: boolean,
    bCartDeliveryGroupId?: number | null,
    bCartSetId?: number | null,
    isBCartSeparateDeliveryRoute?: boolean | null,
    disabled: boolean,
    type: Type,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteProductSubscription = {
  onDeleteProduct?:  {
    __typename: "Product",
    id: string,
    name: string,
    purchasePrice: number,
    unitPrice: number,
    orderType: OrderType,
    viewOrder: number,
    isExportCSV: boolean,
    bCartDeliveryGroupId?: number | null,
    bCartSetId?: number | null,
    isBCartSeparateDeliveryRoute?: boolean | null,
    disabled: boolean,
    type: Type,
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
    firstName: string,
    lastName: string,
    viewOrder: number,
    disabled: boolean,
    type: Type,
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
    firstName: string,
    lastName: string,
    viewOrder: number,
    disabled: boolean,
    type: Type,
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
    firstName: string,
    lastName: string,
    viewOrder: number,
    disabled: boolean,
    type: Type,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};
