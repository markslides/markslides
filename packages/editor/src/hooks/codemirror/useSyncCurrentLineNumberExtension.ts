import { useMemo } from 'react';
import { EditorView, ViewUpdate } from '@codemirror/view';
import codemirrorUtil from '@/lib/codemirror/util';

function useSyncCurrentLineNumberExtension(
    currentLineNumber: number,
    handleChangeLineNumber: (newLineNumber: number) => void
) {
    return useMemo(() => {
        return EditorView.updateListener.of((update: ViewUpdate) => {
            const { state } = update;

            const newLineNumber = codemirrorUtil.getCurrentLineNumber(state);
            if (currentLineNumber === newLineNumber) {
                return;
            }

            handleChangeLineNumber(newLineNumber);
        });
    }, [currentLineNumber]);
}

export default useSyncCurrentLineNumberExtension;
