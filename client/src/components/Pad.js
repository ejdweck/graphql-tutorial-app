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
    return (
      <div className="pad-body">
        <h3>{this.props.pad.name}</h3>
      </div>
    );
  }
}

export default Pad;
