import { EditorSelection } from '@codemirror/state';
import { FaStrikethrough } from 'react-icons/fa6';
import type { ToolbarCommand } from '@/toolbar/types/toolbar';

const strike: ToolbarCommand = {
    name: 'strike',
    icon: <FaStrikethrough />,
    execute: (codeMirrorRef) => {
        const { state, view } = codeMirrorRef;

        if (!state || !view) {
            return;
        }

        view.dispatch(
            view.state.changeByRange((range) => ({
                changes: [
                    { from: range.from, insert: '~~' },
                    { from: range.to, insert: '~~' },
                ],
                range: EditorSelection.range(range.from + 2, range.to + 2),
            }))
        );
    },
};

export default strike;
