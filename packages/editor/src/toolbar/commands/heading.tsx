import { EditorSelection } from '@codemirror/state';
import { FaHeading } from 'react-icons/fa6';
import type { ToolbarCommand } from '@/toolbar/types/toolbar';

const heading: ToolbarCommand = {
    name: 'heading',
    icon: <FaHeading />,
    execute: (codeMirrorRef, callback) => {
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
