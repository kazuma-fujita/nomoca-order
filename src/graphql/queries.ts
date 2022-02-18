/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getClinic = /* GraphQL */ `
  query GetClinic($id: ID!) {
    getClinic(id: $id) {
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
export const listClinics = /* GraphQL */ `
  query ListClinics(
    $filter: ModelClinicFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClinics(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
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
export const listOrders = /* GraphQL */ `
  query ListOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getSubscriptionOrder = /* GraphQL */ `
  query GetSubscriptionOrder($id: ID!) {
    getSubscriptionOrder(id: $id) {
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
export const listSubscriptionOrders = /* GraphQL */ `
  query ListSubscriptionOrders(
    $filter: ModelSubscriptionOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSubscriptionOrders(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
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
export const listProducts = /* GraphQL */ `
  query ListProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getStaff = /* GraphQL */ `
  query GetStaff($id: ID!) {
    getStaff(id: $id) {
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
export const listStaff = /* GraphQL */ `
  query ListStaff(
    $filter: ModelStaffFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStaff(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        type
        viewOrder
        disabled
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const listOrdersSortedByCreatedAt = /* GraphQL */ `
  query ListOrdersSortedByCreatedAt(
    $type: Type!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrdersSortedByCreatedAt(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const listSubscriptionOrdersSortedByCreatedAt = /* GraphQL */ `
  query ListSubscriptionOrdersSortedByCreatedAt(
    $type: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelSubscriptionOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSubscriptionOrdersSortedByCreatedAt(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const listProductsSortedByViewOrder = /* GraphQL */ `
  query ListProductsSortedByViewOrder(
    $type: Type!
    $viewOrder: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProductsSortedByViewOrder(
      type: $type
      viewOrder: $viewOrder
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const listStaffSortedByViewOrder = /* GraphQL */ `
  query ListStaffSortedByViewOrder(
    $type: Type!
    $viewOrder: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelStaffFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStaffSortedByViewOrder(
      type: $type
      viewOrder: $viewOrder
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        type
        viewOrder
        disabled
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
