import { redo as redoHandle } from '@codemirror/commands';
import { RedoIcon } from 'lucide-react';
import type { ToolbarCommand } from '@/toolbar/types/toolbar';

const redo: ToolbarCommand = {
    name: 'redo',
    icon: <RedoIcon size={16} />,
    execute: (codeMirrorRef) => {
        const { state, view } = codeMirrorRef;

        if (!state || !view) {
            return;
        }

        redoHandle(view);
    },
};

export default redo;
