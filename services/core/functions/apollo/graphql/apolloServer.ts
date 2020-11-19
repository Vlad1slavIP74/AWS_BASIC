import { ApolloServer, IResolvers, gql } from 'apollo-server-lambda';
import { ApolloServer as ApolloServerLocal } from 'apollo-server';
import fs                                from 'fs';
import getContext                        from './getContext';
import * as Query                        from './query';
import * as Mutation                     from './mutation';
const NODE_ENV = process.env.NODE_ENV;

const IS_DEV = !NODE_ENV || !['production'].includes(NODE_ENV);

const resolvers = {
  ...Mutation,
  ...Query,
} as IResolvers;

const typeDefs = gql(fs.readFileSync(__dirname.concat('/schema.graphql'), 'utf8'));
const configApollo = {
  typeDefs, resolvers,
  cors: {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  },
  methods: [
    'POST',
    'GET',
  ],
  context: value => {
    return getContext(value);
  },
  formatError: err => {
    // Don't give the specific errors to the client.
    console.log(JSON.stringify(err, null, 2));
    // if (err.extensions.exception.type === 'CUSTOM_ERROR') {
    return err;

    // }

    // return 'SERVER_ERROR';
  },
};

let apolloServer;
if (process.env.LAMBDA) {
  const server = new ApolloServer(configApollo);
  apolloServer =  server.createHandler({
    cors: {
      origin: true,
    },
  });

} else {
  apolloServer = new ApolloServerLocal(configApollo);
}

export default apolloServer;
