import { useMemo } from 'react';
import { EditorView, ViewUpdate } from '@codemirror/view';
import codemirrorUtil from '@/lib/codemirror/util';

function useSyncCurrentSelectionExtension(
    currentSelectionStr: string,
    handleChangeSelectionStr: (newSelectionStr: string) => void
) {
    return useMemo(() => {
        return EditorView.updateListener.of((update: ViewUpdate) => {
            const { state } = update;

            const newSelectionStr =
                codemirrorUtil.getCurrentSelectionStr(state);
            if (currentSelectionStr === newSelectionStr) {
                return;
            }

            handleChangeSelectionStr(newSelectionStr);
        });
    }, [currentSelectionStr]);
}

export default useSyncCurrentSelectionExtension;
