import React, { Component } from 'react';

import './Pad.css'

class Pad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zIndex: 0,
    };
  }

  render() {
    console.log(this.props.notes)
    let notes = this.props.notes.map(note => {
      return (
        <p key={note.id}>{note.title}</p>
      );
    });
    return (
      <div className="pad-body">
        <h3>{this.props.pad.name}</h3>
        {notes}
      </div>
    );
  }
}

export default Pad;
