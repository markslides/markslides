import { Command, EditorView } from '@uiw/react-codemirror';

const newSlideCommand: Command = (editorView: EditorView) => {
    const currentCursorPosition = editorView.state.selection.main.head;

    if (editorView && editorView.hasFocus) {
        editorView.dispatch({
            changes: {
                from: currentCursorPosition - 1,
                // to: currentCursorPosition + 5,
                insert: '\n---\n',
            },
        });
    }
    return true;
};

export default newSlideCommand;
