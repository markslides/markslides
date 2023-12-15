import { EditorSelection } from '@codemirror/state';
import { FaCode } from 'react-icons/fa';
import type { ToolbarCommand } from '@/toolbar/types/toolbar';

const code: ToolbarCommand = {
    name: 'code',
    icon: <FaCode />,
    execute: (codeMirrorRef, callback) => {
        const { state, view } = codeMirrorRef;

        if (!state || !view) {
            return;
        }

        view.dispatch(
            view.state.changeByRange((range) => ({
                changes: [
                    { from: range.from, insert: '`' },
                    { from: range.to, insert: '`' },
                ],
                range: EditorSelection.range(range.from + 1, range.to + 1),
            }))
        );
    },
};

export default code;
