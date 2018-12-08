import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import Draggable from 'react-draggable';
import { Grid, Row, Col } from 'react-bootstrap';

import Note from './Note';


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
            <Col lg={3}>
              <Note pad={pad}/>
            </Col>
          </div>
        )
      });
    }
  }

  render() {
    //console.log(this.props.data.notes)
    return (
      <div>
        <ul id="note-list">
          <Grid>
            <Row>
              {this.displayPads()}
            </Row>
          </Grid>
        </ul>
      </div>
    );
  }
}

export default graphql(getPadsWithNotesQuery)(PadList);
