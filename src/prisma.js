import { Prisma } from 'prisma-binding'
import { fragmentReplacements } from './resolvers'
import { globalConfig } from './configs'

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: globalConfig.prismaEndpoint,
  secret: globalConfig.prismaSecret,
  fragmentReplacements
})

export default prisma