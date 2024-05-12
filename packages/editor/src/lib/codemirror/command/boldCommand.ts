import { EditorSelection } from '@codemirror/state';
import { Command, EditorView } from '@uiw/react-codemirror';

const boldCommand: Command = (editorView: EditorView) => {
    if (editorView && editorView.hasFocus) {
        editorView.dispatch(
            editorView.state.changeByRange((range) => ({
                changes: [
                    { from: range.from, insert: '**' },
                    { from: range.to, insert: '**' },
                ],
                range: EditorSelection.range(range.from + 2, range.to + 2),
            }))
        );
    }
    return true;
};

export default boldCommand;
