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
      mailAddress
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
        mailAddress
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
      products {
        items {
          id
          orderID
          name
          purchasePrice
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
export const listOrders = /* GraphQL */ `
  query ListOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        products {
          items {
            id
            orderID
            name
            purchasePrice
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
        products {
          items {
            id
            orderID
            name
            purchasePrice
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
      nextToken
    }
  }
`;
export const getSubscriptionOrder = /* GraphQL */ `
  query GetSubscriptionOrder($id: ID!) {
    getSubscriptionOrder(id: $id) {
      id
      products {
        items {
          id
          subscriptionOrderID
          productID
          product {
            id
            name
            purchasePrice
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
        products {
          items {
            id
            subscriptionOrderID
            productID
            product {
              id
              name
              purchasePrice
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
        products {
          items {
            id
            subscriptionOrderID
            productID
            product {
              id
              name
              purchasePrice
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
      nextToken
    }
  }
`;
export const getSubscriptionOrderHistory = /* GraphQL */ `
  query GetSubscriptionOrderHistory($id: ID!) {
    getSubscriptionOrderHistory(id: $id) {
      id
      products {
        items {
          id
          orderID
          name
          purchasePrice
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
export const listSubscriptionOrderHistories = /* GraphQL */ `
  query ListSubscriptionOrderHistories(
    $filter: ModelSubscriptionOrderHistoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSubscriptionOrderHistories(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        products {
          items {
            id
            orderID
            name
            purchasePrice
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
      nextToken
    }
  }
`;
export const listSubscriptionOrderHistoriesSortedByCreatedAt = /* GraphQL */ `
  query ListSubscriptionOrderHistoriesSortedByCreatedAt(
    $type: Type!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelSubscriptionOrderHistoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSubscriptionOrderHistoriesSortedByCreatedAt(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        products {
          items {
            id
            orderID
            name
            purchasePrice
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
      nextToken
    }
  }
`;
export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      name
      purchasePrice
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
        purchasePrice
        unitPrice
        orderType
        viewOrder
        isExportCSV
        disabled
        type
        createdAt
        updatedAt
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
        purchasePrice
        unitPrice
        orderType
        viewOrder
        isExportCSV
        disabled
        type
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
export const listStaff = /* GraphQL */ `
  query ListStaff(
    $filter: ModelStaffFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStaff(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        firstName
        lastName
        viewOrder
        disabled
        type
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const listSubscriptionOrdersContainedNextDeliveryDate = /* GraphQL */ `
  query ListSubscriptionOrdersContainedNextDeliveryDate {
    listSubscriptionOrdersContainedNextDeliveryDate {
      id
      products {
        items {
          id
          subscriptionOrderID
          productID
          product {
            id
            name
            purchasePrice
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
export const getCurrentDate = /* GraphQL */ `
  query GetCurrentDate {
    getCurrentDate {
      currentDate
    }
  }
`;
export const sendOrderMail = /* GraphQL */ `
  query SendOrderMail(
    $toAddresses: [String!]!
    $sendMailType: SendMailType!
    $products: [String!]!
    $subtotal: Int!
    $tax: Int!
    $total: Int!
    $clinicName: String!
    $phoneNumber: String!
    $postalCode: String!
    $state: String!
    $city: String!
    $address: String!
    $building: String
    $staffName: String!
    $deliveryType: DeliveryType
    $deliveryStartYear: Int
    $deliveryStartMonth: Int
    $deliveryInterval: Int
  ) {
    sendOrderMail(
      toAddresses: $toAddresses
      sendMailType: $sendMailType
      products: $products
      subtotal: $subtotal
      tax: $tax
      total: $total
      clinicName: $clinicName
      phoneNumber: $phoneNumber
      postalCode: $postalCode
      state: $state
      city: $city
      address: $address
      building: $building
      staffName: $staffName
      deliveryType: $deliveryType
      deliveryStartYear: $deliveryStartYear
      deliveryStartMonth: $deliveryStartMonth
      deliveryInterval: $deliveryInterval
    )
  }
`;
export const sendErrorMail = /* GraphQL */ `
  query SendErrorMail($toAddress: String!, $subject: String!, $body: String!) {
    sendErrorMail(toAddress: $toAddress, subject: $subject, body: $body)
  }
`;
