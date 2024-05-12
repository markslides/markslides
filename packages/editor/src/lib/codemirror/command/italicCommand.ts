import { EditorSelection } from '@codemirror/state';
import { Command, EditorView } from '@uiw/react-codemirror';

const italicCommand: Command = (editorView: EditorView) => {
    if (editorView && editorView.hasFocus) {
        editorView.dispatch(
            editorView.state.changeByRange((range) => ({
                changes: [
                    { from: range.from, insert: '*' },
                    { from: range.to, insert: '*' },
                ],
                range: EditorSelection.range(range.from + 1, range.to + 1),
            }))
        );
    }
    return true;
};

export default italicCommand;
