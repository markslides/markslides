import { EditorSelection } from '@codemirror/state';
import { CodeXmlIcon } from 'lucide-react';
import type { ToolbarCommand } from '@/toolbar/types/toolbar';

const code: ToolbarCommand = {
    name: 'code',
    icon: <CodeXmlIcon size={16} />,
    execute: (codeMirrorRef) => {
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
