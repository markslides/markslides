import { useMemo } from 'react';
import { EditorView, ViewUpdate } from '@codemirror/view';
import codemirrorUtil from '@/lib/codemirror/util';

function useSyncCurrentCursorPositionExtension(
    currentCursorPosition: number,
    handleChangeCursorPosition: (newCursorPosition: number) => void
) {
    return useMemo(() => {
        return EditorView.updateListener.of((update: ViewUpdate) => {
            const { state } = update;

            const newCursorPosition =
                codemirrorUtil.getCurrentCursorPosition(state);
            if (currentCursorPosition === newCursorPosition) {
                return;
            }

            handleChangeCursorPosition(newCursorPosition);
        });
    }, [currentCursorPosition]);
}

export default useSyncCurrentCursorPositionExtension;
