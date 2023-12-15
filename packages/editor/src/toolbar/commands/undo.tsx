import { undo as undoHandle } from '@codemirror/commands';
import { IoArrowUndo } from 'react-icons/io5';
import type { ToolbarCommand } from '@/toolbar/types/toolbar';

const undo: ToolbarCommand = {
    name: 'undo',
    icon: <IoArrowUndo />,
    execute: (codeMirrorRef, callback) => {
        const { state, view } = codeMirrorRef;

        if (!state || !view) {
            return;
        }

        undoHandle(view);
    },
};

export default undo;
