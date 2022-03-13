import { createServer } from '@graphql-yoga/node'
import { makeExecutableSchema } from '@graphql-tools/schema'
import cookieParser from 'cookie-parser'
import express from 'express'
import jwt from 'jsonwebtoken'
import cors from 'cors'

import { typeDefinitions } from './typeDefs'
import Mutation from './resolvers/Mutation'
import Query from './resolvers/Query'
import config from './config'
import { createContext } from './context'

const app = express()

app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}))
app.use(cookieParser())

app.use((req, res, next) => {
  const { token } = req.cookies
  if (token) {
    // @ts-ignore
    const { userId } = jwt.verify(token, config.jwtSecret)
    // @ts-ignore
    req.userId = userId
  }
  next()
})

const graphQLServer = createServer({
  schema: makeExecutableSchema({
    typeDefs: typeDefinitions,
    resolvers: {
      Mutation,
      Query,
    },
  }),
  context: createContext as any
})

app.use('/graphql', graphQLServer.requestListener)

app.listen(4000, () => {
  console.log('Running a GraphQL API server at http://localhost:4000/graphql')
})
