// export { default as graphqlHandler } from './graphql/apolloServer';
import apolloServer from './graphql/apolloServer';

if (!process.env.LAMBDA) {
  apolloServer.listen().then(({ url }) => {
      console.log(`🚀  Local Server ready at ${url}`);
    });
}
export  const graphqlHandler =  apolloServer;
