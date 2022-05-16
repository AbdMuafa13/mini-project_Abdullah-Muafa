import { InMemoryCache, ApolloClient } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://mini-project-muafa.hasura.app/v1/graphql',
    cache: new InMemoryCache(),
    headers: {
        'x-hasura-admin-secret': 'PF9fWOkcqlsx1vv1yNCjIYoSgZgSbEVMDE0O875H5Tl3yPYfXEKuJY27nBtCce2C',
    }
  });
  
  export default client;