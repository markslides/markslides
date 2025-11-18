import { EditorState } from '@codemirror/state';

const regExpForFence = /^```/;

const codemirrorUtil = {
    getCurrentSelectionStr: (state: EditorState) => {
        const { from, to } = state.selection.main;
        return state.sliceDoc(from, to);
    },
    getCurrentCursorPosition: (state: EditorState) => {
        return state.selection.main.head;
    },
    getCurrentLineNumber: (state: EditorState) => {
        return state.doc.lineAt(state.selection.main.head).number;
    },
    getLineFromSlideIndex: (state: EditorState, slideIndex: number) => {
        let lineNum = 1;
        let slideCount = 1;
        let isInsideFence = false;

        const iterLine = state.doc.iterLines();
        while (!iterLine.done && lineNum < state.doc.lines) {
            // Check if current line starts or ends a fence
            if (regExpForFence.test(iterLine.value)) {
                isInsideFence = !isInsideFence;
            }

            // Only count dividers that are not inside fence blocks
            if (iterLine.value === '---' && !isInsideFence) {
                slideCount++;
            }
            lineNum++;

            if (slideCount === slideIndex + 1) {
                break;
            }

            iterLine.next();
        }

        const line = state.doc.line(lineNum);
        return line;
    },
    getPageInfo: (state: EditorState) => {
        const currentLineNumber = state.doc.lineAt(
            state.selection.main.head
        ).number;

        let lineNum = 1;
        let totalPageCount = 1;
        let currentPageNumber = 1;
        let isInsideFence = false;
        const iterLine = state.doc.iterLines();
        while (!iterLine.done) {
            // Check if current line starts or ends a fence
            if (regExpForFence.test(iterLine.value)) {
                isInsideFence = !isInsideFence;
            }

            // Only count dividers that are not inside fence blocks as page separators
            if (iterLine.value === '---' && !isInsideFence) {
                totalPageCount++;
            }

            if (lineNum === currentLineNumber) {
                currentPageNumber = totalPageCount;
            }
            lineNum++;

            iterLine.next();
        }

        return { currentPageNumber, totalPageCount };
    },
};

export default codemirrorUtil;
