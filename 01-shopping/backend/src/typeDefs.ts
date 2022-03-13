export const typeDefinitions = /* GraphQL */ `
  scalar Date

  enum Permission {
    ADMIN
    USER
    ITERMCREATE
    ITEMUPDATE
    ITEMDELETE
    PERMISSIONUPDATE
  }

  type Item {
    id: Int!
    title: String!
    description: String!
    image: String
    largeImage: String
    price: Int!
    createdAt: Date!
    updatedAt: Date!
  }

  type User {
    id: Int!
    name: String!
    email: String!
    password: String!
    resetToken: String!
    resetTokenExpiry: String!
    permission: [Permission!]!
  }

  type Meta {
    count: Int!
  }

  type Mutation {
    createItem(title: String, description: String, price: Int, image: String, largeImage: String): Item!
    updateItem(id: Int!, title: String, description: String, price: Int): Item!
    deleteItem(id: Int!): Item
    signup(email: String!, password: String!, name: String!): User!
  }

  type Query {
    items(first: Int, skip: Int): [Item]!
    item(id: Int!): Item
    _allItemsMeta: Meta
  }
`