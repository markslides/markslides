import { EditorSelection } from '@codemirror/state';
import { FaRegImage } from 'react-icons/fa6';
// import { openModal } from '@/redux/slices/modalSlice';
import type { ToolbarCommand } from '@/toolbar/types/toolbar';

const image: ToolbarCommand = {
    name: 'image',
    icon: <FaRegImage />,
    execute: (codeMirrorRef, callback) => {
        // dispatch(
        //     openModal({
        //         key: 'Images',
        //     })
        // );
        // return;

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
