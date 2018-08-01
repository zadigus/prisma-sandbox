import { GraphQLServer } from 'graphql-yoga';
import { Prisma } from './generated/prisma';

import resolvers from './resolvers';
import typeDefs = require('./schema.graphql');

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false
  },
  context: req => ({
    ...req,
    db: new Prisma({
      endpoint: process.env.PRISMA_ENDPOINT, // the endpoint of the Prisma DB service (value is set in .env)
      secret: process.env.PRISMA_SECRET, // taken from database/prisma.yml (value is set in .env)
      debug: true // log all GraphQL queries & mutations // TODO: let that depend on the process.env.NODE_ENV
    })
  })
});

server.options.port = Number(process.env.PORT) || 4000;
server.options.endpoint = '/';

server.start(() =>
  console.log(`Server is running on http://localhost:${server.options.port}`)
);
