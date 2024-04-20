import { EditorSelection } from '@codemirror/state';
import { HeadingIcon } from 'lucide-react';
import type { ToolbarCommand } from '@/toolbar/types/toolbar';

const heading: ToolbarCommand = {
    name: 'heading',
    icon: (
        <HeadingIcon
            size={16}
            strokeWidth={4}
        />
    ),
    execute: (codeMirrorRef) => {
        const { state, view } = codeMirrorRef;

        if (!state || !view) {
            return;
        }

        const lineInfo = view.state.doc.lineAt(view.state.selection.main.from);
        let mark = '#';
        const matchMark = lineInfo.text.match(/^#+/);
        if (matchMark && matchMark[0]) {
            const txt = matchMark[0];
            if (txt.length < 6) {
                mark = txt + '#';
            }
        }
        if (mark.length > 6) {
            mark = '#';
        }
        const title = lineInfo.text.replace(/^#+/, '');
        view.dispatch({
            changes: {
                from: lineInfo.from,
                to: lineInfo.to,
                insert: `${mark} ${title}`,
            },
            // selection: EditorSelection.range(lineInfo.from + mark.length, lineInfo.to),
            selection: { anchor: lineInfo.from + mark.length + 1 },
        });
    },
};

export default heading;
