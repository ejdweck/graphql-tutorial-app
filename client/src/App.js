import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
// css
import './App.css';
// components
import PadList from './components/PadList';

// apollo setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

export const App = () => (
  <ApolloProvider client={client}>
    <div className="App">
      <h1>Title title Headline</h1>
      <PadList />
    </div>
  </ApolloProvider>
);


export default App;
