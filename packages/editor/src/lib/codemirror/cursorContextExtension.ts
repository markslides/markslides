import { EditorView, ViewUpdate } from '@codemirror/view';
import codemirrorUtil from '@/lib/codemirror/util';
import type { CursorContext } from '@/lib/types/common';

function cursorContextExtension(
    callback: (cursorContext: CursorContext) => void
) {
    return EditorView.updateListener.of((update: ViewUpdate) => {
        const { state } = update;

        const cursorPosition = codemirrorUtil.getCurrentCursorPosition(state);
        const lineNumber = codemirrorUtil.getCurrentLineNumber(state);
        const selectionStr = codemirrorUtil.getCurrentSelectionStr(state);

        callback({ cursorPosition, lineNumber, selectionStr });
    });
}

export default cursorContextExtension;
