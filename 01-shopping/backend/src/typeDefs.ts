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

  type Mutation {
    createItem(title: String, description: String, price: Int, image: String, largeImage: String): Item!
  }

  type Query {
    items: [Item]!
  }
`