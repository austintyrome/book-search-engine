import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// Create an Apollo Client instance
const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql', // Replace with your GraphQL server URI
  cache: new InMemoryCache(),
});

const ApolloProviderWrapper = ({ children }) => (
  <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
);

export default ApolloProviderWrapper;