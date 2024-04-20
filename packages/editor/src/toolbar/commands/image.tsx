import { EditorSelection } from '@codemirror/state';
import { ImageIcon } from 'lucide-react';
import type { ToolbarCommand } from '@/toolbar/types/toolbar';

const image: ToolbarCommand = {
    name: 'image',
    icon: <ImageIcon size={16} />,
    execute: (codeMirrorRef) => {
        const { state, view } = codeMirrorRef;

        if (!state || !view) {
            return;
        }

        const main = view.state.selection.main;
        const txt = view.state.sliceDoc(
            view.state.selection.main.from,
            view.state.selection.main.to
        );
        view.dispatch({
            changes: {
                from: main.from,
                to: main.to,
                insert: `![](${txt})`,
            },
            selection: EditorSelection.range(main.from + 4, main.to + 4),
            // selection: { anchor: main.from + 4 },
        });
    },
};

export default image;
