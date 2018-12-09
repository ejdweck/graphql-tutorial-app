import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import Pad from './Pad';
import GridLayout from 'react-grid-layout';

import '../../node_modules/react-grid-layout/css/styles.css';
import '../../node_modules/react-resizable/css/styles.css';

const getPadsWithNotesQuery = gql`
  {
    pads {
      id,
      name,
      notes {
        title
        id
      }
    }
  }
`
class PadList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layout: null,
    };
  }

  displayPads = () => {
    var data = this.props.data;
    if (data.loading) {
      return (<div>Loading notes!</div>);
    } else {
      return data.pads.map(pad => {
        return (
          <div>
            <Pad pad={pad}/>
          </div>
        )
      });
    }
  }

  layoutChange = (layout) => {
    console.log('layout change', layout);
  }

  generateStartingLayout = () => {
    let layout = [];
    let x = 0;
    this.props.data.pads.map(pad => {
      let key = pad.name
      let obj = {i: key, x: x, y: 0, w: 3, h: 5, minW: 2, minH: 4};
      if (x+3 >= 12) {
        x = 0;
      } else {
        x += 3;
      }
      return layout.push(obj);
    });
    this.setState({layout: layout})
  }
      
  render() {
    let data = this.props.data;
    console.log(this.props.data)
    
    let pads;
    if (data.loading) {
      return (<div>Loading notes!</div>);
    } else {
      // only want to call this if layout is null and there is no previous layout saved
      if (this.state.layout == null) {
        this.generateStartingLayout();
      }
      pads = this.props.data.pads.map(pad => {
        return (
          <div 
            className="pad"
            key={pad.name}
            >
            <Pad pad={pad} notes={pad.notes}/>
          </div>
        )
      });
    }
    
    return (
      <div>
        <GridLayout 
          style={{backgroundColor: 'white'}}
          className="layout"
          cols={12}
          rowHeight={40}
          width={1200}
          onLayoutChange={this.layoutChange}
          layout={this.state.layout}
          >
          {pads} 
        </GridLayout>
      </div>
    );
  }
}

export default graphql(getPadsWithNotesQuery)(PadList);
