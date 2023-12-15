import { EditorSelection } from '@codemirror/state';
import { FaListOl } from 'react-icons/fa6';
import type { ToolbarCommand } from '@/toolbar/types/toolbar';

const orderedList: ToolbarCommand = {
    name: 'orderedList',
    icon: <FaListOl />,
    execute: (codeMirrorRef, callback) => {
        const { state, view } = codeMirrorRef;

        if (!state || !view) {
            return;
        }

        const lineInfo = view.state.doc.lineAt(view.state.selection.main.from);
        let mark = '1. ';
        const matchMark = lineInfo.text.match(/^\1\./);
        if (matchMark && matchMark[0]) {
            mark = '';
        }
        view.dispatch({
            changes: {
                from: lineInfo.from,
                to: lineInfo.to,
                insert: `${mark}${lineInfo.text}`,
            },
            // selection: EditorSelection.range(lineInfo.from + mark.length, lineInfo.to),
            selection: { anchor: view.state.selection.main.from + mark.length },
        });
    },
};

export default orderedList;
