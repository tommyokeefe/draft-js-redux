export const EDITOR_STATE_CHANGED = 'EDITOR_STATE_CHANGED';
export const ASSET_CREATED = 'ASSET_CREATED';

export function editorStateChanged(editorState) {
  return {
    type: EDITOR_STATE_CHANGED,
    payload: { editorState },
  }
}

export function assetCreated(editorState) {
  return {
    type: ASSET_CREATED,
    payload: { editorState },
  }
}
