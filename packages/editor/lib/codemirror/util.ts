import { EditorState } from '@codemirror/state';

const codemirrorUtil = {
    getCurrentSelectionStr: (state: EditorState) => {
        const { from, to } = state.selection.main;
        return state.sliceDoc(from, to);
    },
    getCurrentCursorPosition: (state: EditorState) => {
        return state.selection.main.head;
    },
    getCurrentLineNumber: (state: EditorState) => {
        return state.doc.lineAt(state.selection.main.head).number;
    },
};

export default codemirrorUtil;
