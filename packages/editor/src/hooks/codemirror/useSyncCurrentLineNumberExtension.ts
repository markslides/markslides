import { useMemo } from 'react';
import { EditorView, ViewUpdate } from '@codemirror/view';
import codemirrorUtil from '@/lib/codemirror/util';

function useSyncCurrentLineNumberExtension(
    handleChangeLineNumber: (newLineNumber: number) => void
) {
    return useMemo(() => {
        return EditorView.updateListener.of((update: ViewUpdate) => {
            const { state } = update;

            const newLineNumber = codemirrorUtil.getCurrentLineNumber(state);

            handleChangeLineNumber(newLineNumber);
        });
    }, []);
}

export default useSyncCurrentLineNumberExtension;
