/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateClinic = /* GraphQL */ `
  subscription OnCreateClinic($owner: String) {
    onCreateClinic(owner: $owner) {
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
export const onUpdateClinic = /* GraphQL */ `
  subscription OnUpdateClinic($owner: String) {
    onUpdateClinic(owner: $owner) {
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
export const onDeleteClinic = /* GraphQL */ `
  subscription OnDeleteClinic($owner: String) {
    onDeleteClinic(owner: $owner) {
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
export const onCreateOrder = /* GraphQL */ `
  subscription OnCreateOrder($owner: String) {
    onCreateOrder(owner: $owner) {
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
export const onUpdateOrder = /* GraphQL */ `
  subscription OnUpdateOrder($owner: String) {
    onUpdateOrder(owner: $owner) {
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
export const onDeleteOrder = /* GraphQL */ `
  subscription OnDeleteOrder($owner: String) {
    onDeleteOrder(owner: $owner) {
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
export const onCreateOrderProduct = /* GraphQL */ `
  subscription OnCreateOrderProduct($owner: String) {
    onCreateOrderProduct(owner: $owner) {
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
export const onUpdateOrderProduct = /* GraphQL */ `
  subscription OnUpdateOrderProduct($owner: String) {
    onUpdateOrderProduct(owner: $owner) {
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
export const onDeleteOrderProduct = /* GraphQL */ `
  subscription OnDeleteOrderProduct($owner: String) {
    onDeleteOrderProduct(owner: $owner) {
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
export const onCreateSubscriptionOrder = /* GraphQL */ `
  subscription OnCreateSubscriptionOrder($owner: String) {
    onCreateSubscriptionOrder(owner: $owner) {
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
export const onUpdateSubscriptionOrder = /* GraphQL */ `
  subscription OnUpdateSubscriptionOrder($owner: String) {
    onUpdateSubscriptionOrder(owner: $owner) {
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
export const onDeleteSubscriptionOrder = /* GraphQL */ `
  subscription OnDeleteSubscriptionOrder($owner: String) {
    onDeleteSubscriptionOrder(owner: $owner) {
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
export const onCreateSubscriptionOrderProduct = /* GraphQL */ `
  subscription OnCreateSubscriptionOrderProduct($owner: String) {
    onCreateSubscriptionOrderProduct(owner: $owner) {
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
export const onUpdateSubscriptionOrderProduct = /* GraphQL */ `
  subscription OnUpdateSubscriptionOrderProduct($owner: String) {
    onUpdateSubscriptionOrderProduct(owner: $owner) {
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
export const onDeleteSubscriptionOrderProduct = /* GraphQL */ `
  subscription OnDeleteSubscriptionOrderProduct($owner: String) {
    onDeleteSubscriptionOrderProduct(owner: $owner) {
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
export const onCreateSubscriptionOrderHistory = /* GraphQL */ `
  subscription OnCreateSubscriptionOrderHistory($owner: String) {
    onCreateSubscriptionOrderHistory(owner: $owner) {
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
export const onUpdateSubscriptionOrderHistory = /* GraphQL */ `
  subscription OnUpdateSubscriptionOrderHistory($owner: String) {
    onUpdateSubscriptionOrderHistory(owner: $owner) {
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
export const onDeleteSubscriptionOrderHistory = /* GraphQL */ `
  subscription OnDeleteSubscriptionOrderHistory($owner: String) {
    onDeleteSubscriptionOrderHistory(owner: $owner) {
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
export const onCreateSubscriptionOrderHistoryProduct = /* GraphQL */ `
  subscription OnCreateSubscriptionOrderHistoryProduct($owner: String) {
    onCreateSubscriptionOrderHistoryProduct(owner: $owner) {
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
export const onUpdateSubscriptionOrderHistoryProduct = /* GraphQL */ `
  subscription OnUpdateSubscriptionOrderHistoryProduct($owner: String) {
    onUpdateSubscriptionOrderHistoryProduct(owner: $owner) {
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
export const onDeleteSubscriptionOrderHistoryProduct = /* GraphQL */ `
  subscription OnDeleteSubscriptionOrderHistoryProduct($owner: String) {
    onDeleteSubscriptionOrderHistoryProduct(owner: $owner) {
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
export const onCreateProduct = /* GraphQL */ `
  subscription OnCreateProduct {
    onCreateProduct {
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
export const onUpdateProduct = /* GraphQL */ `
  subscription OnUpdateProduct {
    onUpdateProduct {
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
export const onDeleteProduct = /* GraphQL */ `
  subscription OnDeleteProduct {
    onDeleteProduct {
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
export const onCreateStaff = /* GraphQL */ `
  subscription OnCreateStaff($owner: String) {
    onCreateStaff(owner: $owner) {
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
export const onUpdateStaff = /* GraphQL */ `
  subscription OnUpdateStaff($owner: String) {
    onUpdateStaff(owner: $owner) {
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
export const onDeleteStaff = /* GraphQL */ `
  subscription OnDeleteStaff($owner: String) {
    onDeleteStaff(owner: $owner) {
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
