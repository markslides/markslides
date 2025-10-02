import { EditorView, ViewUpdate } from '@codemirror/view';
import codemirrorUtil from '@/lib/codemirror/util';
import type { SlideInfo } from '@/lib/types/common';

function slideInfoExtension(onChange: (slideInfo: SlideInfo) => void) {
    let prevSlideInfo: SlideInfo | null = null;

    return EditorView.updateListener.of((update: ViewUpdate) => {
        const { state } = update;

        const currentLineNumber = codemirrorUtil.getCurrentLineNumber(state);

        let lineNum = 1;
        let totalPageCount = 1;
        let currentPageNumber = 1;
        let slideTitle: string | undefined = '';
        let pageTitleArray: (string | undefined)[] = [];
        let isSearchTitleMode = true;
        const iterLine = state.doc.iterLines();
        while (!iterLine.done) {
            if (iterLine.value === '---') {
                // Handle no slide title case
                if (totalPageCount > 1 && isSearchTitleMode) {
                    pageTitleArray.push('');
                }

                totalPageCount++;
                isSearchTitleMode = true;
            }

            if (isSearchTitleMode && iterLine.value.startsWith('#')) {
                isSearchTitleMode = false;
                const parsedTitle = iterLine.value.split(/# /);
                if (parsedTitle.length > 1) {
                    if (totalPageCount === 1) {
                        slideTitle = parsedTitle[1];
                    }
                    pageTitleArray.push(parsedTitle[1]);
                }
            }

            if (lineNum === currentLineNumber) {
                currentPageNumber = totalPageCount;
            }
            lineNum++;

            iterLine.next();
        }

        const slideInfo: SlideInfo = {
            slideTitle,
            currentPageTitle: pageTitleArray[currentPageNumber - 1],
            currentPageNumber,
            totalPageCount,
        };

        // Compare with previous slide info and call callback if changed or cursor position changed
        const hasSelectionChanged = update.selectionSet;
        if (
            !prevSlideInfo ||
            prevSlideInfo.slideTitle !== slideInfo.slideTitle ||
            prevSlideInfo.currentPageTitle !== slideInfo.currentPageTitle ||
            prevSlideInfo.currentPageNumber !== slideInfo.currentPageNumber ||
            prevSlideInfo.totalPageCount !== slideInfo.totalPageCount ||
            hasSelectionChanged
        ) {
            prevSlideInfo = { ...slideInfo };
            onChange(slideInfo);
        }
    });
}

export default slideInfoExtension;
