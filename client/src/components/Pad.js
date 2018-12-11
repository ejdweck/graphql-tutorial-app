import React, { Component } from 'react';
import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css'
import './Pad.css'

class Pad extends Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
    this.setEditor = (editor) => {
      this.editor = editor;
    };
    this.focusEditor = () => {
      if (this.editor) {
        this.editor.focus();
      }
    };
  }

  componentDidMount() {
    this.focusEditor();
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
        <div style={styles.editor} onClick={this.focusEditor}>
          <Editor
            ref={this.setEditor}
            editorState={this.state.editorState}
            onChange={this.onChange}
          />
        </div>
        {notes}
      </div>
    );
  }
}

const styles = {
  editor: {
    border: '1px solid gray',
    minHeight: '6em'
  }
};


export default Pad;
