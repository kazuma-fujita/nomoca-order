/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createClinic = /* GraphQL */ `
  mutation CreateClinic(
    $input: CreateClinicInput!
    $condition: ModelClinicConditionInput
  ) {
    createClinic(input: $input, condition: $condition) {
      id
      name
      phoneNumber
      postalCode
      state
      city
      address
      building
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateClinic = /* GraphQL */ `
  mutation UpdateClinic(
    $input: UpdateClinicInput!
    $condition: ModelClinicConditionInput
  ) {
    updateClinic(input: $input, condition: $condition) {
      id
      name
      phoneNumber
      postalCode
      state
      city
      address
      building
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteClinic = /* GraphQL */ `
  mutation DeleteClinic(
    $input: DeleteClinicInput!
    $condition: ModelClinicConditionInput
  ) {
    deleteClinic(input: $input, condition: $condition) {
      id
      name
      phoneNumber
      postalCode
      state
      city
      address
      building
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createOrder = /* GraphQL */ `
  mutation CreateOrder(
    $input: CreateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    createOrder(input: $input, condition: $condition) {
      id
      products {
        items {
          id
          orderID
          name
          unitPrice
          quantity
          viewOrder
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      staffID
      staff {
        id
        name
        viewOrder
        disabled
        type
        createdAt
        updatedAt
        owner
      }
      orderType
      deliveryStatus
      deliveryType
      deliveryStartYear
      deliveryStartMonth
      deliveryInterval
      deliveredAt
      createdAt
      type
      updatedAt
      owner
    }
  }
`;
export const updateOrder = /* GraphQL */ `
  mutation UpdateOrder(
    $input: UpdateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    updateOrder(input: $input, condition: $condition) {
      id
      products {
        items {
          id
          orderID
          name
          unitPrice
          quantity
          viewOrder
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      staffID
      staff {
        id
        name
        viewOrder
        disabled
        type
        createdAt
        updatedAt
        owner
      }
      orderType
      deliveryStatus
      deliveryType
      deliveryStartYear
      deliveryStartMonth
      deliveryInterval
      deliveredAt
      createdAt
      type
      updatedAt
      owner
    }
  }
`;
export const deleteOrder = /* GraphQL */ `
  mutation DeleteOrder(
    $input: DeleteOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    deleteOrder(input: $input, condition: $condition) {
      id
      products {
        items {
          id
          orderID
          name
          unitPrice
          quantity
          viewOrder
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      staffID
      staff {
        id
        name
        viewOrder
        disabled
        type
        createdAt
        updatedAt
        owner
      }
      orderType
      deliveryStatus
      deliveryType
      deliveryStartYear
      deliveryStartMonth
      deliveryInterval
      deliveredAt
      createdAt
      type
      updatedAt
      owner
    }
  }
`;
export const createOrderProduct = /* GraphQL */ `
  mutation CreateOrderProduct(
    $input: CreateOrderProductInput!
    $condition: ModelOrderProductConditionInput
  ) {
    createOrderProduct(input: $input, condition: $condition) {
      id
      orderID
      name
      unitPrice
      quantity
      viewOrder
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateOrderProduct = /* GraphQL */ `
  mutation UpdateOrderProduct(
    $input: UpdateOrderProductInput!
    $condition: ModelOrderProductConditionInput
  ) {
    updateOrderProduct(input: $input, condition: $condition) {
      id
      orderID
      name
      unitPrice
      quantity
      viewOrder
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteOrderProduct = /* GraphQL */ `
  mutation DeleteOrderProduct(
    $input: DeleteOrderProductInput!
    $condition: ModelOrderProductConditionInput
  ) {
    deleteOrderProduct(input: $input, condition: $condition) {
      id
      orderID
      name
      unitPrice
      quantity
      viewOrder
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createSubscriptionOrder = /* GraphQL */ `
  mutation CreateSubscriptionOrder(
    $input: CreateSubscriptionOrderInput!
    $condition: ModelSubscriptionOrderConditionInput
  ) {
    createSubscriptionOrder(input: $input, condition: $condition) {
      id
      products {
        items {
          id
          subscriptionOrderID
          productID
          product {
            id
            name
            unitPrice
            orderType
            viewOrder
            disabled
            type
            createdAt
            updatedAt
          }
          quantity
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      staffID
      staff {
        id
        name
        viewOrder
        disabled
        type
        createdAt
        updatedAt
        owner
      }
      deliveryStartYear
      deliveryStartMonth
      deliveryInterval
      createdAt
      type
      updatedAt
      owner
    }
  }
`;
export const updateSubscriptionOrder = /* GraphQL */ `
  mutation UpdateSubscriptionOrder(
    $input: UpdateSubscriptionOrderInput!
    $condition: ModelSubscriptionOrderConditionInput
  ) {
    updateSubscriptionOrder(input: $input, condition: $condition) {
      id
      products {
        items {
          id
          subscriptionOrderID
          productID
          product {
            id
            name
            unitPrice
            orderType
            viewOrder
            disabled
            type
            createdAt
            updatedAt
          }
          quantity
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      staffID
      staff {
        id
        name
        viewOrder
        disabled
        type
        createdAt
        updatedAt
        owner
      }
      deliveryStartYear
      deliveryStartMonth
      deliveryInterval
      createdAt
      type
      updatedAt
      owner
    }
  }
`;
export const deleteSubscriptionOrder = /* GraphQL */ `
  mutation DeleteSubscriptionOrder(
    $input: DeleteSubscriptionOrderInput!
    $condition: ModelSubscriptionOrderConditionInput
  ) {
    deleteSubscriptionOrder(input: $input, condition: $condition) {
      id
      products {
        items {
          id
          subscriptionOrderID
          productID
          product {
            id
            name
            unitPrice
            orderType
            viewOrder
            disabled
            type
            createdAt
            updatedAt
          }
          quantity
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      staffID
      staff {
        id
        name
        viewOrder
        disabled
        type
        createdAt
        updatedAt
        owner
      }
      deliveryStartYear
      deliveryStartMonth
      deliveryInterval
      createdAt
      type
      updatedAt
      owner
    }
  }
`;
export const createSubscriptionOrderProduct = /* GraphQL */ `
  mutation CreateSubscriptionOrderProduct(
    $input: CreateSubscriptionOrderProductInput!
    $condition: ModelSubscriptionOrderProductConditionInput
  ) {
    createSubscriptionOrderProduct(input: $input, condition: $condition) {
      id
      subscriptionOrderID
      productID
      product {
        id
        name
        unitPrice
        orderType
        viewOrder
        disabled
        type
        createdAt
        updatedAt
      }
      quantity
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateSubscriptionOrderProduct = /* GraphQL */ `
  mutation UpdateSubscriptionOrderProduct(
    $input: UpdateSubscriptionOrderProductInput!
    $condition: ModelSubscriptionOrderProductConditionInput
  ) {
    updateSubscriptionOrderProduct(input: $input, condition: $condition) {
      id
      subscriptionOrderID
      productID
      product {
        id
        name
        unitPrice
        orderType
        viewOrder
        disabled
        type
        createdAt
        updatedAt
      }
      quantity
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteSubscriptionOrderProduct = /* GraphQL */ `
  mutation DeleteSubscriptionOrderProduct(
    $input: DeleteSubscriptionOrderProductInput!
    $condition: ModelSubscriptionOrderProductConditionInput
  ) {
    deleteSubscriptionOrderProduct(input: $input, condition: $condition) {
      id
      subscriptionOrderID
      productID
      product {
        id
        name
        unitPrice
        orderType
        viewOrder
        disabled
        type
        createdAt
        updatedAt
      }
      quantity
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createProduct = /* GraphQL */ `
  mutation CreateProduct(
    $input: CreateProductInput!
    $condition: ModelProductConditionInput
  ) {
    createProduct(input: $input, condition: $condition) {
      id
      name
      unitPrice
      orderType
      viewOrder
      disabled
      type
      createdAt
      updatedAt
    }
  }
`;
export const updateProduct = /* GraphQL */ `
  mutation UpdateProduct(
    $input: UpdateProductInput!
    $condition: ModelProductConditionInput
  ) {
    updateProduct(input: $input, condition: $condition) {
      id
      name
      unitPrice
      orderType
      viewOrder
      disabled
      type
      createdAt
      updatedAt
    }
  }
`;
export const deleteProduct = /* GraphQL */ `
  mutation DeleteProduct(
    $input: DeleteProductInput!
    $condition: ModelProductConditionInput
  ) {
    deleteProduct(input: $input, condition: $condition) {
      id
      name
      unitPrice
      orderType
      viewOrder
      disabled
      type
      createdAt
      updatedAt
    }
  }
`;
export const createStaff = /* GraphQL */ `
  mutation CreateStaff(
    $input: CreateStaffInput!
    $condition: ModelStaffConditionInput
  ) {
    createStaff(input: $input, condition: $condition) {
      id
      name
      viewOrder
      disabled
      type
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateStaff = /* GraphQL */ `
  mutation UpdateStaff(
    $input: UpdateStaffInput!
    $condition: ModelStaffConditionInput
  ) {
    updateStaff(input: $input, condition: $condition) {
      id
      name
      viewOrder
      disabled
      type
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteStaff = /* GraphQL */ `
  mutation DeleteStaff(
    $input: DeleteStaffInput!
    $condition: ModelStaffConditionInput
  ) {
    deleteStaff(input: $input, condition: $condition) {
      id
      name
      viewOrder
      disabled
      type
      createdAt
      updatedAt
      owner
    }
  }
`;
