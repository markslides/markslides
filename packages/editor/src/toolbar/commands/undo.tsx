import { undo as undoHandle } from '@codemirror/commands';
import { UndoIcon } from 'lucide-react';
import type { ToolbarCommand } from '@/toolbar/types/toolbar';

const undo: ToolbarCommand = {
    name: 'undo',
    icon: <UndoIcon size={16} />,
    execute: (codeMirrorRef) => {
        const { state, view } = codeMirrorRef;

        if (!state || !view) {
            return;
        }

        undoHandle(view);
    },
};

export default undo;
