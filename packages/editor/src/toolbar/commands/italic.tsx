import { EditorSelection } from '@codemirror/state';
import { ItalicIcon } from 'lucide-react';
import type { ToolbarCommand } from '@/toolbar/types/toolbar';

const italic: ToolbarCommand = {
    name: 'italic',
    icon: <ItalicIcon size={16} />,
    execute: (codeMirrorRef) => {
        const { state, view } = codeMirrorRef;

        if (!state || !view) {
            return;
        }

        view.dispatch(
            view.state.changeByRange((range) => ({
                changes: [
                    { from: range.from, insert: '*' },
                    { from: range.to, insert: '*' },
                ],
                range: EditorSelection.range(range.from + 1, range.to + 1),
            }))
        );
    },
};

export default italic;
