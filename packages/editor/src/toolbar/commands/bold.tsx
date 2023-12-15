import { EditorSelection } from '@codemirror/state';
import { FaBold } from 'react-icons/fa';
import type { ToolbarCommand } from '@/toolbar/types/toolbar';

const bold: ToolbarCommand = {
    name: 'bold',
    icon: <FaBold />,
    execute: (codeMirrorRef, callback) => {
        const { state, view } = codeMirrorRef;

        if (!state || !view) {
            return;
        }

        view.dispatch(
            view.state.changeByRange((range) => ({
                changes: [
                    { from: range.from, insert: '**' },
                    { from: range.to, insert: '**' },
                ],
                range: EditorSelection.range(range.from + 2, range.to + 2),
            }))
        );
    },
};

export default bold;
