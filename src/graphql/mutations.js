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
      mailAddress
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
      mailAddress
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
      mailAddress
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
          isExportCSV
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      clinicID
      clinic {
        id
        name
        phoneNumber
        postalCode
        state
        city
        address
        building
        mailAddress
        createdAt
        updatedAt
        owner
      }
      staffID
      staff {
        id
        firstName
        lastName
        viewOrder
        disabled
        type
        createdAt
        updatedAt
        owner
      }
      deliveryStatus
      deliveryType
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
          isExportCSV
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      clinicID
      clinic {
        id
        name
        phoneNumber
        postalCode
        state
        city
        address
        building
        mailAddress
        createdAt
        updatedAt
        owner
      }
      staffID
      staff {
        id
        firstName
        lastName
        viewOrder
        disabled
        type
        createdAt
        updatedAt
        owner
      }
      deliveryStatus
      deliveryType
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
          isExportCSV
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      clinicID
      clinic {
        id
        name
        phoneNumber
        postalCode
        state
        city
        address
        building
        mailAddress
        createdAt
        updatedAt
        owner
      }
      staffID
      staff {
        id
        firstName
        lastName
        viewOrder
        disabled
        type
        createdAt
        updatedAt
        owner
      }
      deliveryStatus
      deliveryType
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
      isExportCSV
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
      isExportCSV
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
      isExportCSV
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
            isExportCSV
            disabled
            type
            createdAt
            updatedAt
          }
          quantity
          viewOrder
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      clinicID
      clinic {
        id
        name
        phoneNumber
        postalCode
        state
        city
        address
        building
        mailAddress
        createdAt
        updatedAt
        owner
      }
      staffID
      staff {
        id
        firstName
        lastName
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
      nextDeliveryYear
      nextDeliveryMonth
      lastDeliveredAt
      createdAt
      type
      owner
      updatedAt
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
            isExportCSV
            disabled
            type
            createdAt
            updatedAt
          }
          quantity
          viewOrder
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      clinicID
      clinic {
        id
        name
        phoneNumber
        postalCode
        state
        city
        address
        building
        mailAddress
        createdAt
        updatedAt
        owner
      }
      staffID
      staff {
        id
        firstName
        lastName
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
      nextDeliveryYear
      nextDeliveryMonth
      lastDeliveredAt
      createdAt
      type
      owner
      updatedAt
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
            isExportCSV
            disabled
            type
            createdAt
            updatedAt
          }
          quantity
          viewOrder
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      clinicID
      clinic {
        id
        name
        phoneNumber
        postalCode
        state
        city
        address
        building
        mailAddress
        createdAt
        updatedAt
        owner
      }
      staffID
      staff {
        id
        firstName
        lastName
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
      nextDeliveryYear
      nextDeliveryMonth
      lastDeliveredAt
      createdAt
      type
      owner
      updatedAt
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
        isExportCSV
        disabled
        type
        createdAt
        updatedAt
      }
      quantity
      viewOrder
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
        isExportCSV
        disabled
        type
        createdAt
        updatedAt
      }
      quantity
      viewOrder
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
        isExportCSV
        disabled
        type
        createdAt
        updatedAt
      }
      quantity
      viewOrder
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createSubscriptionOrderHistory = /* GraphQL */ `
  mutation CreateSubscriptionOrderHistory(
    $input: CreateSubscriptionOrderHistoryInput!
    $condition: ModelSubscriptionOrderHistoryConditionInput
  ) {
    createSubscriptionOrderHistory(input: $input, condition: $condition) {
      id
      products {
        items {
          id
          orderID
          name
          unitPrice
          quantity
          viewOrder
          isExportCSV
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      clinicID
      clinic {
        id
        name
        phoneNumber
        postalCode
        state
        city
        address
        building
        mailAddress
        createdAt
        updatedAt
        owner
      }
      staffID
      staff {
        id
        firstName
        lastName
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
      nextDeliveryYear
      nextDeliveryMonth
      createdAt
      type
      owner
      updatedAt
    }
  }
`;
export const updateSubscriptionOrderHistory = /* GraphQL */ `
  mutation UpdateSubscriptionOrderHistory(
    $input: UpdateSubscriptionOrderHistoryInput!
    $condition: ModelSubscriptionOrderHistoryConditionInput
  ) {
    updateSubscriptionOrderHistory(input: $input, condition: $condition) {
      id
      products {
        items {
          id
          orderID
          name
          unitPrice
          quantity
          viewOrder
          isExportCSV
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      clinicID
      clinic {
        id
        name
        phoneNumber
        postalCode
        state
        city
        address
        building
        mailAddress
        createdAt
        updatedAt
        owner
      }
      staffID
      staff {
        id
        firstName
        lastName
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
      nextDeliveryYear
      nextDeliveryMonth
      createdAt
      type
      owner
      updatedAt
    }
  }
`;
export const deleteSubscriptionOrderHistory = /* GraphQL */ `
  mutation DeleteSubscriptionOrderHistory(
    $input: DeleteSubscriptionOrderHistoryInput!
    $condition: ModelSubscriptionOrderHistoryConditionInput
  ) {
    deleteSubscriptionOrderHistory(input: $input, condition: $condition) {
      id
      products {
        items {
          id
          orderID
          name
          unitPrice
          quantity
          viewOrder
          isExportCSV
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      clinicID
      clinic {
        id
        name
        phoneNumber
        postalCode
        state
        city
        address
        building
        mailAddress
        createdAt
        updatedAt
        owner
      }
      staffID
      staff {
        id
        firstName
        lastName
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
      nextDeliveryYear
      nextDeliveryMonth
      createdAt
      type
      owner
      updatedAt
    }
  }
`;
export const createSubscriptionOrderHistoryProduct = /* GraphQL */ `
  mutation CreateSubscriptionOrderHistoryProduct(
    $input: CreateSubscriptionOrderHistoryProductInput!
    $condition: ModelSubscriptionOrderHistoryProductConditionInput
  ) {
    createSubscriptionOrderHistoryProduct(
      input: $input
      condition: $condition
    ) {
      id
      orderID
      name
      unitPrice
      quantity
      viewOrder
      isExportCSV
      owner
      createdAt
      updatedAt
    }
  }
`;
export const updateSubscriptionOrderHistoryProduct = /* GraphQL */ `
  mutation UpdateSubscriptionOrderHistoryProduct(
    $input: UpdateSubscriptionOrderHistoryProductInput!
    $condition: ModelSubscriptionOrderHistoryProductConditionInput
  ) {
    updateSubscriptionOrderHistoryProduct(
      input: $input
      condition: $condition
    ) {
      id
      orderID
      name
      unitPrice
      quantity
      viewOrder
      isExportCSV
      owner
      createdAt
      updatedAt
    }
  }
`;
export const deleteSubscriptionOrderHistoryProduct = /* GraphQL */ `
  mutation DeleteSubscriptionOrderHistoryProduct(
    $input: DeleteSubscriptionOrderHistoryProductInput!
    $condition: ModelSubscriptionOrderHistoryProductConditionInput
  ) {
    deleteSubscriptionOrderHistoryProduct(
      input: $input
      condition: $condition
    ) {
      id
      orderID
      name
      unitPrice
      quantity
      viewOrder
      isExportCSV
      owner
      createdAt
      updatedAt
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
      isExportCSV
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
      isExportCSV
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
      isExportCSV
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
      firstName
      lastName
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
      firstName
      lastName
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
      firstName
      lastName
      viewOrder
      disabled
      type
      createdAt
      updatedAt
      owner
    }
  }
`;
