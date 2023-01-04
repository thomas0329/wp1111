import { GraphQLServer, PubSub } from 'graphql-yoga';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';
import UserModel from './models/user';
import ImageModel from './models/image';
import { createPubSub, createSchema, createYoga } from 'graphql-yoga';
import { createServer } from 'node:http';
import * as fs from 'fs';

const pubsub = createPubSub();

const yoga = createYoga({
  schema: createSchema({
    typeDefs: fs.readFileSync(
      './src/schema.graphql',
      'utf-8' ),
    resolvers: {
      Query,
      Mutation,
      // Subscription
    },
  }),
  context: {
    pubsub,
    UserModel,
    ImageModel
  },
  graphqlEndpoint: '/'
});

const server = createServer(yoga);

export default server;

