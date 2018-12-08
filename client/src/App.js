import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
//css
import './App.css';
//components
import PadList from './components/PadList';

// apollo setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <h1>This the NoteBook - Listen up</h1>
          <PadList />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
