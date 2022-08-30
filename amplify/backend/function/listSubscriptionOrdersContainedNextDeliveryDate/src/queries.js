"use strict";
/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendErrorMail = exports.sendOrderMail = exports.getCurrentDate = exports.listSubscriptionOrdersContainedNextDeliveryDate = exports.listStaffSortedByViewOrder = exports.listStaff = exports.getStaff = exports.listProductsSortedByViewOrder = exports.listProducts = exports.getProduct = exports.listSubscriptionOrderHistoriesSortedByCreatedAt = exports.listSubscriptionOrderHistories = exports.getSubscriptionOrderHistory = exports.listSubscriptionOrdersSortedByCreatedAt = exports.listSubscriptionOrders = exports.getSubscriptionOrder = exports.listOrdersSortedByCreatedAt = exports.listOrders = exports.getOrder = exports.listClinics = exports.getClinic = void 0;
exports.getClinic = `
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
exports.listClinics = `
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
exports.getOrder = `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
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
exports.listOrders = `
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
exports.listOrdersSortedByCreatedAt = `
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
exports.getSubscriptionOrder = `
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
exports.listSubscriptionOrders = `
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
exports.listSubscriptionOrdersSortedByCreatedAt = `
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
exports.getSubscriptionOrderHistory = `
  query GetSubscriptionOrderHistory($id: ID!) {
    getSubscriptionOrderHistory(id: $id) {
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
exports.listSubscriptionOrderHistories = `
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
exports.listSubscriptionOrderHistoriesSortedByCreatedAt = `
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
exports.getProduct = `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
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
exports.listProducts = `
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
exports.listProductsSortedByViewOrder = `
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
exports.getStaff = `
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
exports.listStaff = `
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
exports.listStaffSortedByViewOrder = `
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
exports.listSubscriptionOrdersContainedNextDeliveryDate = `
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
exports.getCurrentDate = `
  query GetCurrentDate {
    getCurrentDate {
      currentDate
    }
  }
`;
exports.sendOrderMail = `
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
exports.sendErrorMail = `
  query SendErrorMail($toAddress: String!, $subject: String!, $body: String!) {
    sendErrorMail(toAddress: $toAddress, subject: $subject, body: $body)
  }
`;
