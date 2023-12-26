import { useMemo } from 'react';
import { EditorView, ViewUpdate } from '@codemirror/view';
import codemirrorUtil from '@/lib/codemirror/util';

function useSyncCurrentCursorPositionExtension(
    handleChangeCursorPosition: (newCursorPosition: number) => void
) {
    return useMemo(() => {
        return EditorView.updateListener.of((update: ViewUpdate) => {
            const { state } = update;

            const newCursorPosition =
                codemirrorUtil.getCurrentCursorPosition(state);

            handleChangeCursorPosition(newCursorPosition);
        });
    }, []);
}

export default useSyncCurrentCursorPositionExtension;
