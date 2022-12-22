import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from '@apollo/client';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import App from './containers/App';
import reportWebVitals from './reportWebVitals';
import { ChatProvider } from "./containers/hooks/useChat";
import { GraphQLWsLink } from
  '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

// Create an http link:
// const httpLink = new HttpLink({
//   uri: 'http://localhost:5001/',
// });
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
});
// // Create a WebSocket link:
// const wsLink = new WebSocketLink({
//   uri: `ws://localhost:5001/`,
//   options: { reconnect: true },
// });
const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:4000/graphql',
  options: {
    lazy: true,
  },
}));

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);



// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

// const client = new ApolloClient({
//   link,
//   cache: new InMemoryCache().restore({}),
// });

// const client = new ApolloClient({
//   uri: 'http://localhost:4000/graphql',
//   cache: new InMemoryCache(),
// });

// const root = ReactDOM.createRoot(document.getElementById("root"));

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ChatProvider>
        <App />
      </ChatProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
