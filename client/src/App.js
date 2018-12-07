import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
//css
import './App.css';
//components
import NoteList from './components/NoteList';

// apollo setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <h1>This the NoteBook - listen up</h1>
          <NoteList />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
