import { createServer } from '@graphql-yoga/node'
import { makeExecutableSchema } from '@graphql-tools/schema'


import { typeDefinitions } from './typeDefs'
import Mutation from './resolvers/Mutation'
import Query from './resolvers/Query'

async function main() {
  const server = createServer({
    schema: makeExecutableSchema({
      typeDefs: typeDefinitions,
      resolvers: {
        Mutation,
        Query,
      },
    }),

  })
  await server.start()
}

main()