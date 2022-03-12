export const typeDefinitions = /* GraphQL */ `
  scalar Date

  type Item {
    id: ID!
    title: String!
    description: String!
    image: String
    largeImage: String
    price: Int!
    createdAt: Date!
    updatedAt: Date!
  }

  type Meta {
    count: Int!
  }

  type Mutation {
    createItem(title: String, description: String, price: Int, image: String, largeImage: String): Item!
    updateItem(id: Int!, title: String, description: String, price: Int): Item!
    deleteItem(id: Int!): Item
  }

  type Query {
    items: [Item]!
    item(id: Int!): Item
    _allItemsMeta: Meta
  }
`