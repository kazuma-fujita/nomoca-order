/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBlog = /* GraphQL */ `
  subscription OnCreateBlog {
    onCreateBlog {
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
export const onUpdateBlog = /* GraphQL */ `
  subscription OnUpdateBlog {
    onUpdateBlog {
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
export const onDeleteBlog = /* GraphQL */ `
  subscription OnDeleteBlog {
    onDeleteBlog {
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
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
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
            type
            viewOrder
            disabled
            createdAt
            updatedAt
          }
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
            type
            viewOrder
            disabled
            createdAt
            updatedAt
          }
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
            type
            viewOrder
            disabled
            createdAt
            updatedAt
          }
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
export const onCreateSubscriptionOrderProduct = /* GraphQL */ `
  subscription OnCreateSubscriptionOrderProduct($owner: String) {
    onCreateSubscriptionOrderProduct(owner: $owner) {
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
        type
        viewOrder
        disabled
        createdAt
        updatedAt
      }
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
        type
        viewOrder
        disabled
        createdAt
        updatedAt
      }
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
      type
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
      type
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
      type
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
