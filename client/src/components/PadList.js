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

  render() {
    //console.log(this.props.data.notes)
    var layout = [
      {i: 'work', x: 0, y: 0, w: 3, h: 4, minW: 2, minH: 4},
      {i: 'school', x: 3, y: 0, w: 3, h: 4, minW: 2, minH: 4},
      {i: 'buy', x: 6, y: 0, w: 3, h: 4, minW: 2, minH: 4},
      {i: 'home', x: 9, y: 0, w: 3, h: 4, minW: 2, minH: 4},
      {i: 'fun', x: 0, y: 3, w: 3, h: 4, minW: 2, minH: 4},
    ];
    let data = this.props.data
    let pads;
    if (data.loading) {
      return (<div>Loading notes!</div>);
    } else {
      pads = this.props.data.pads.map(pad => {
        return (
          <div 
            className="pad"
            key={pad.name}
            >
            <Pad pad={pad}/>
          </div>
        )
      });
    }
    
    return (
      <div>
        <GridLayout 
          className="layout"
          cols={12}
          rowHeight={30}
          width={1200}
          layout={layout}
          onLayoutChange={this.layoutChange}
          >
          {pads} 
        </GridLayout>
      </div>
    );
  }
}

export default graphql(getPadsWithNotesQuery)(PadList);
