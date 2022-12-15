import { GraphQLServer, PubSub } from 'graphql-yoga';
// import db from './db';
import ChatBoxModel from './models/chatbox'
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';
// import User from './resolvers/User';
// import Post from './resolvers/Post';
// import Comment from './resolvers/Comment';
import { createPubSub, createSchema, createYoga } from 'graphql-yoga';
import { createServer } from 'node:http';
import * as fs from 'fs';

const pubsub = createPubSub();

// const server = new GraphQLServer({
//   typeDefs: './src/schema.graphql',
//   resolvers: {
//     Query,
//     Mutation,
//     Subscription,
//     User,
//     Post,
//     Comment,
//   },
//   context: {
//     db,
//     pubsub,
//   },
// });

const yoga = createYoga({
  schema: createSchema({
    typeDefs: fs.readFileSync(
      './src/schema.graphql',
      'utf-8' ),
    resolvers: {
      Query,
      Mutation,
      Subscription,
      // User,
      // Post,
      // Comment,
    },
  }),
  context: {
    // db,
    pubsub, 
    ChatBoxModel
  },
  graphqlEndpoint: '/'
});

const server = createServer(yoga);
// server.listen({ port: process.env.PORT | 5001 }, () => {
//   console.log(`The server is up on port ${process.env.PORT | 5001}!`);
// });
export default server

// server.start({ port: process.env.PORT | 5000 }, () => {
//   console.log(`The server is up on port ${process.env.PORT | 5000}!`);
// });
