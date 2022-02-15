/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateOrder = /* GraphQL */ `
  subscription OnCreateOrder($owner: String) {
    onCreateOrder(owner: $owner) {
      id
      type
      orderType
      staffID
      products {
        items {
          id
          orderID
          productID
          product {
            id
            name
            unitPrice
            type
            orderType
            viewOrder
            disabled
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
      staff {
        id
        name
        type
        viewOrder
        disabled
        createdAt
        updatedAt
        owner
      }
      deliveryStatus
      deliveryType
      deliveryStartYear
      deliveryStartMonth
      deliveryInterval
      deliveredAt
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateOrder = /* GraphQL */ `
  subscription OnUpdateOrder($owner: String) {
    onUpdateOrder(owner: $owner) {
      id
      type
      orderType
      staffID
      products {
        items {
          id
          orderID
          productID
          product {
            id
            name
            unitPrice
            type
            orderType
            viewOrder
            disabled
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
      staff {
        id
        name
        type
        viewOrder
        disabled
        createdAt
        updatedAt
        owner
      }
      deliveryStatus
      deliveryType
      deliveryStartYear
      deliveryStartMonth
      deliveryInterval
      deliveredAt
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteOrder = /* GraphQL */ `
  subscription OnDeleteOrder($owner: String) {
    onDeleteOrder(owner: $owner) {
      id
      type
      orderType
      staffID
      products {
        items {
          id
          orderID
          productID
          product {
            id
            name
            unitPrice
            type
            orderType
            viewOrder
            disabled
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
      staff {
        id
        name
        type
        viewOrder
        disabled
        createdAt
        updatedAt
        owner
      }
      deliveryStatus
      deliveryType
      deliveryStartYear
      deliveryStartMonth
      deliveryInterval
      deliveredAt
      createdAt
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
      productID
      product {
        id
        name
        unitPrice
        type
        orderType
        viewOrder
        disabled
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
export const onUpdateOrderProduct = /* GraphQL */ `
  subscription OnUpdateOrderProduct($owner: String) {
    onUpdateOrderProduct(owner: $owner) {
      id
      orderID
      productID
      product {
        id
        name
        unitPrice
        type
        orderType
        viewOrder
        disabled
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
export const onDeleteOrderProduct = /* GraphQL */ `
  subscription OnDeleteOrderProduct($owner: String) {
    onDeleteOrderProduct(owner: $owner) {
      id
      orderID
      productID
      product {
        id
        name
        unitPrice
        type
        orderType
        viewOrder
        disabled
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
export const onCreateSubscriptionOrder = /* GraphQL */ `
  subscription OnCreateSubscriptionOrder($owner: String) {
    onCreateSubscriptionOrder(owner: $owner) {
      id
      staffID
      type
      products {
        items {
          id
          subscriptionOrderID
          productID
          product {
            id
            name
            unitPrice
            type
            orderType
            viewOrder
            disabled
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
      staff {
        id
        name
        type
        viewOrder
        disabled
        createdAt
        updatedAt
        owner
      }
      deliveryStartYear
      deliveryStartMonth
      deliveryInterval
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateSubscriptionOrder = /* GraphQL */ `
  subscription OnUpdateSubscriptionOrder($owner: String) {
    onUpdateSubscriptionOrder(owner: $owner) {
      id
      staffID
      type
      products {
        items {
          id
          subscriptionOrderID
          productID
          product {
            id
            name
            unitPrice
            type
            orderType
            viewOrder
            disabled
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
      staff {
        id
        name
        type
        viewOrder
        disabled
        createdAt
        updatedAt
        owner
      }
      deliveryStartYear
      deliveryStartMonth
      deliveryInterval
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteSubscriptionOrder = /* GraphQL */ `
  subscription OnDeleteSubscriptionOrder($owner: String) {
    onDeleteSubscriptionOrder(owner: $owner) {
      id
      staffID
      type
      products {
        items {
          id
          subscriptionOrderID
          productID
          product {
            id
            name
            unitPrice
            type
            orderType
            viewOrder
            disabled
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
      staff {
        id
        name
        type
        viewOrder
        disabled
        createdAt
        updatedAt
        owner
      }
      deliveryStartYear
      deliveryStartMonth
      deliveryInterval
      createdAt
      updatedAt
      owner
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
        type
        orderType
        viewOrder
        disabled
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
        type
        orderType
        viewOrder
        disabled
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
        type
        orderType
        viewOrder
        disabled
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
export const onCreateProduct = /* GraphQL */ `
  subscription OnCreateProduct {
    onCreateProduct {
      id
      name
      unitPrice
      type
      orderType
      viewOrder
      disabled
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
      type
      orderType
      viewOrder
      disabled
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
      type
      orderType
      viewOrder
      disabled
      createdAt
      updatedAt
    }
  }
`;
export const onCreateStaff = /* GraphQL */ `
  subscription OnCreateStaff($owner: String) {
    onCreateStaff(owner: $owner) {
      id
      name
      type
      viewOrder
      disabled
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
      name
      type
      viewOrder
      disabled
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
      name
      type
      viewOrder
      disabled
      createdAt
      updatedAt
      owner
    }
  }
`;
