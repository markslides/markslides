import type { ReactCodeMirrorRef } from '@uiw/react-codemirror';

export type ToolbarCommand = {
    name: string;
    icon: React.ReactElement;
    execute: (codeMirrorRef: ReactCodeMirrorRef) => void;
};
