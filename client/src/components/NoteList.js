import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getNotesQuery = gql`
  {
    notes {
      title
      id
    }
  }
`
class NoteList extends Component {
  displayNotes() {
    var data = this.props.data;
    if (data.loading) {
      return (<div>Loading notes!</div>);
    } else {
      return data.notes.map(note => {
        return (
          <li key={note.id}>{note.title}</li>
        )
      })
    }
  }

  render() {
    console.log(this.props.data.notes)
    return (
      <div>
        <ul id="note-list">
          {this.displayNotes()}
        </ul>
      </div>
    );
  }
}

export default graphql(getNotesQuery)(NoteList);
