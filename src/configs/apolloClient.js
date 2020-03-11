import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';

export default new ApolloClient({
  uri: `${process.env.REACT_APP_API_BASE_URL}/graphql`,
  cache: new InMemoryCache(),
});
