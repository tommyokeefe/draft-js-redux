import React from 'react';
import { connect } from 'react-redux';
import { Modifier, EditorState } from 'draft-js';

import * as Actions from './actions';

import EditorWrapper from '../../components/EditorWrapper';

import { stateFromHTML } from 'draft-js-import-html';
import parseMSWord from './utils/parseMSWord';

class Editor extends React.Component {

  constructor(props) {
    super(props);
    this.onEditorChange = this.onEditorChange.bind(this);
    this.onAssetCreated = this.onAssetCreated.bind(this);
    this.handlePastedText = this.handlePastedText.bind(this);
  }

  onEditorChange(editorState) {
    this.props.dispatch(Actions.editorStateChanged(editorState));
  }

  onAssetCreated() {
    this.props.dispatch(Actions.assetCreated(this.props.editor.editorState));
  }

  handlePastedText(text, html) {
    const editorState = this.props.editor.editorState;
    const blockMap = stateFromHTML(html, { parser: parseMSWord }).blockMap;
    const newState = Modifier.replaceWithFragment(editorState.getCurrentContent(), editorState.getSelection(), blockMap);
    const newEditorState = EditorState.push(editorState, newState, 'insert-fragment');
    this.onEditorChange(newEditorState);
    return 'handled';
  }

  render() {
    const outerWrapperStyle = {
      width: 400,
      margin: '20px auto',
    };
    const editorWrapperStyle = {
      minHeight: 400,
      border: '1px black solid',
      padding: '5px',
    };
    const buttonStyle = {
      padding: 10,
      margin: '10px auto',
      border: '1px black solid',
    };
    return (
      <div style={outerWrapperStyle}>
        <div style={editorWrapperStyle}>
          <EditorWrapper
            editorState={this.props.editor.editorState}
            onChange={this.onEditorChange}
            handlePastedText={this.handlePastedText}
          />
        </div>
        <button style={buttonStyle} onClick={this.onAssetCreated}>Add custom asset</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const editor = state.get('editor');
  return { editor };
}

export default connect(mapStateToProps)(Editor);