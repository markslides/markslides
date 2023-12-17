import { redo as redoHandle } from '@codemirror/commands';
import { IoArrowRedo } from 'react-icons/io5';
import type { ToolbarCommand } from '@/toolbar/types/toolbar';

const redo: ToolbarCommand = {
    name: 'redo',
    icon: <IoArrowRedo />,
    execute: (codeMirrorRef) => {
        const { state, view } = codeMirrorRef;

        if (!state || !view) {
            return;
        }

        redoHandle(view);
    },
};

export default redo;
