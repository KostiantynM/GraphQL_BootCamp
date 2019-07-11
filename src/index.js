import '@babel/polyfill'
import { GraphQLServer, PubSub } from 'graphql-yoga'
import { resolvers, fragmentReplacements } from './resolvers'
import db from './db'
import prisma from './prisma'
import globalConfig from './configs/globalConfig'

const pubSub = new PubSub()

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context(request) {
    return {
      db,
      pubSub,
      prisma,
      request,
    }
  },
  fragmentReplacements
})

const options = {
  port: globalConfig.yogaServerPort
}

server.start(options,() => {
  console.log(`Server started on localhost:${globalConfig.yogaServerPort}`);
})