import { useMemo } from 'react';
import { EditorView, ViewUpdate } from '@codemirror/view';
import codemirrorUtil from '@/lib/codemirror/util';

function useSyncCurrentSelectionExtension(
    handleChangeSelectionStr: (newSelectionStr: string) => void
) {
    return useMemo(() => {
        return EditorView.updateListener.of((update: ViewUpdate) => {
            const { state } = update;

            const newSelectionStr =
                codemirrorUtil.getCurrentSelectionStr(state);

            handleChangeSelectionStr(newSelectionStr);
        });
    }, []);
}

export default useSyncCurrentSelectionExtension;
