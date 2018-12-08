import React, { Component } from 'react';

import Draggable from 'react-draggable';
import './Note.css'
class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zIndex: 0,
    };
  }

  render() {
    return (
      <div style={{zIndex: this.state.zIndex, postition: 'absolute'}} >
        <Draggable key={this.props.pad.name}>
          <div className="Note">
            <div className="handle">Drag from here</div>
            <div>{this.props.pad.name}</div>
          </div>
        </Draggable>
      </div>
    );
  }
}

export default Note;
