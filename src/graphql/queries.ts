/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBlog = /* GraphQL */ `
  query GetBlog($id: ID!) {
    getBlog(id: $id) {
      id
      name
      posts {
        items {
          id
          title
          blogID
          blog {
            id
            name
            posts {
              nextToken
            }
            createdAt
            updatedAt
          }
          comments {
            items {
              id
              postID
              content
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listBlogs = /* GraphQL */ `
  query ListBlogs(
    $filter: ModelBlogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBlogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        posts {
          items {
            id
            title
            blogID
            blog {
              id
              name
              createdAt
              updatedAt
            }
            comments {
              nextToken
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      title
      blogID
      blog {
        id
        name
        posts {
          items {
            id
            title
            blogID
            blog {
              id
              name
              createdAt
              updatedAt
            }
            comments {
              nextToken
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      comments {
        items {
          id
          postID
          post {
            id
            title
            blogID
            blog {
              id
              name
              createdAt
              updatedAt
            }
            comments {
              nextToken
            }
            createdAt
            updatedAt
          }
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        blogID
        blog {
          id
          name
          posts {
            items {
              id
              title
              blogID
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        comments {
          items {
            id
            postID
            post {
              id
              title
              blogID
              createdAt
              updatedAt
            }
            content
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      postID
      post {
        id
        title
        blogID
        blog {
          id
          name
          posts {
            items {
              id
              title
              blogID
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        comments {
          items {
            id
            postID
            post {
              id
              title
              blogID
              createdAt
              updatedAt
            }
            content
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      content
      createdAt
      updatedAt
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        postID
        post {
          id
          title
          blogID
          blog {
            id
            name
            posts {
              nextToken
            }
            createdAt
            updatedAt
          }
          comments {
            items {
              id
              postID
              content
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        content
        createdAt
        updatedAt
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
            type
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
              type
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
      type
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
        type
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
export const listStaffs = /* GraphQL */ `
  query ListStaffs(
    $filter: ModelStaffFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStaffs(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
export const listSubscriptionOrdersSortedByCreatedAt = /* GraphQL */ `
  query ListSubscriptionOrdersSortedByCreatedAt(
    $type: String
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
              type
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
    $type: String
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
        type
        viewOrder
        disabled
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listStaffsSortedByViewOrder = /* GraphQL */ `
  query ListStaffsSortedByViewOrder(
    $type: String
    $viewOrder: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelStaffFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStaffsSortedByViewOrder(
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
