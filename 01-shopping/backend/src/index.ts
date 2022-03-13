import { createServer } from '@graphql-yoga/node'
import { makeExecutableSchema } from '@graphql-tools/schema'
import cookieParser from 'cookie-parser'
import express from 'express'

import { typeDefinitions } from './typeDefs'
import Mutation from './resolvers/Mutation'
import Query from './resolvers/Query'

const app = express()

app.use(cookieParser())

const graphQLServer = createServer({
  schema: makeExecutableSchema({
    typeDefs: typeDefinitions,
    resolvers: {
      Mutation,
      Query,
    },
  }),
})

app.use('/graphql', graphQLServer.requestListener)

app.listen(4000, () => {
  console.log('Running a GraphQL API server at http://localhost:4000/graphql')
})
