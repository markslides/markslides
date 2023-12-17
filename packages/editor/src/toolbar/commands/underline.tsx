import { EditorSelection } from '@codemirror/state';
import { FaUnderline } from 'react-icons/fa6';
import type { ToolbarCommand } from '@/toolbar/types/toolbar';

const underline: ToolbarCommand = {
    name: 'underline',
    icon: <FaUnderline />,
    execute: (codeMirrorRef) => {
        const { state, view } = codeMirrorRef;

        if (!state || !view) {
            return;
        }

        view.dispatch(
            view.state.changeByRange((range) => ({
                changes: [
                    { from: range.from, insert: '<u>' },
                    { from: range.to, insert: '</u>' },
                ],
                range: EditorSelection.range(range.from + 3, range.to + 3),
            }))
        );
    },
};

export default underline;
