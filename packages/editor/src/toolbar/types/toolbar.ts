import type { ReactCodeMirrorRef } from '@uiw/react-codemirror';

export type ToolbarCommand = {
    name: string;
    icon: JSX.Element;
    execute: (codeMirrorRef: ReactCodeMirrorRef, callback?: () => void) => void;
};
