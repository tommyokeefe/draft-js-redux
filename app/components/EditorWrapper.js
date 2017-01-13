import React from 'react';
import Editor from 'draft-js-plugins-editor';
import 'draft-js/dist/Draft.css';

import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin'; // eslint-disable-line import/no-unresolved
import 'draft-js-inline-toolbar-plugin/lib/plugin.css'; // eslint-disable-line import/no-unresolved

import createAssetPlugin from '../containers/Editor/plugins/asset-plugin';

const assetPlugin = createAssetPlugin();

const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;

export default class EditorWrapper extends React.Component {

  constructor(props) {
    super(props);
  }



  render() {
    return (
      <div>
        <Editor
          handlePastedText={this.props.handlePastedText}
          editorState={this.props.editorState}
          onChange={this.props.onChange}
          plugins={[
            assetPlugin,
            inlineToolbarPlugin,
          ]}
        />
        <InlineToolbar/>
      </div>
    );
  }
}