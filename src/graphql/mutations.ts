/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBlog = /* GraphQL */ `
  mutation CreateBlog(
    $input: CreateBlogInput!
    $condition: ModelBlogConditionInput
  ) {
    createBlog(input: $input, condition: $condition) {
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
export const updateBlog = /* GraphQL */ `
  mutation UpdateBlog(
    $input: UpdateBlogInput!
    $condition: ModelBlogConditionInput
  ) {
    updateBlog(input: $input, condition: $condition) {
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
export const deleteBlog = /* GraphQL */ `
  mutation DeleteBlog(
    $input: DeleteBlogInput!
    $condition: ModelBlogConditionInput
  ) {
    deleteBlog(input: $input, condition: $condition) {
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
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
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
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
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
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
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
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
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
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
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
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
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
export const createSubscriptionOrder = /* GraphQL */ `
  mutation CreateSubscriptionOrder(
    $input: CreateSubscriptionOrderInput!
    $condition: ModelSubscriptionOrderConditionInput
  ) {
    createSubscriptionOrder(input: $input, condition: $condition) {
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
export const updateSubscriptionOrder = /* GraphQL */ `
  mutation UpdateSubscriptionOrder(
    $input: UpdateSubscriptionOrderInput!
    $condition: ModelSubscriptionOrderConditionInput
  ) {
    updateSubscriptionOrder(input: $input, condition: $condition) {
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
export const deleteSubscriptionOrder = /* GraphQL */ `
  mutation DeleteSubscriptionOrder(
    $input: DeleteSubscriptionOrderInput!
    $condition: ModelSubscriptionOrderConditionInput
  ) {
    deleteSubscriptionOrder(input: $input, condition: $condition) {
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
      type
      viewOrder
      disabled
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
      type
      viewOrder
      disabled
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
      type
      viewOrder
      disabled
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
      type
      viewOrder
      disabled
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
      type
      viewOrder
      disabled
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
      type
      viewOrder
      disabled
      createdAt
      updatedAt
      owner
    }
  }
`;
