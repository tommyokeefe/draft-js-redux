import {
  EditorState,
  Modifier,
  SelectionState,
} from 'draft-js';

import * as Actions from './actions';

const initialState = {
  editorState: EditorState.createEmpty(),
};

export default function editor(state = initialState, action) {
  switch (action.type) {
    case Actions.EDITOR_STATE_CHANGED:
      return {
        ...state,
        editorState: action.payload.editorState,
      };

    case Actions.ASSET_CREATED:
      const currentEditorState = action.payload.editorState;
      const currentSelection = currentEditorState.getSelection();
      const currentKey = currentSelection.getAnchorKey();
      const currentContent = currentEditorState.getCurrentContent();

      // split the current block
      const contentWithSplitBlocks = Modifier.splitBlock(currentContent, currentSelection);

      // turn the old block into an asset
      const blockMap = contentWithSplitBlocks.getBlockMap();
      const oldBlock = blockMap.get(currentKey);
      const assetBlock = oldBlock.merge({
        text: '',
        type: 'asset',
        data: {},
      });
      const newContent = contentWithSplitBlocks.merge({
        blockMap: blockMap.set(currentKey, assetBlock),
      });
      const editorStateWithNewContent = EditorState.push(currentEditorState, newContent, 'split-block');

      // select the new block
      const newKey = contentWithSplitBlocks.getKeyAfter(currentKey);
      const editorStateWithFocus = EditorState.forceSelection(
        editorStateWithNewContent,
        new SelectionState({
          anchorKey: newKey,
          anchorOffset: 0,
          focusKey: newKey,
          focusOffset: 0,
        })
      );
      return {
        ...state,
        editorState: editorStateWithFocus,
      };

    default:
      return state;
  }
}
