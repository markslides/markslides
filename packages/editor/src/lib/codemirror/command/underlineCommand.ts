import { EditorSelection } from '@codemirror/state';
import { Command, EditorView } from '@uiw/react-codemirror';

const underlineCommand: Command = (editorView: EditorView) => {
    if (editorView && editorView.hasFocus) {
        editorView.dispatch(
            editorView.state.changeByRange((range) => ({
                changes: [
                    { from: range.from, insert: '<u>' },
                    { from: range.to, insert: '</u>' },
                ],
                range: EditorSelection.range(range.from + 3, range.to + 3),
            }))
        );
    }
    return true;
};

export default underlineCommand;
