import { useMemo } from 'react';
import { EditorView, ViewUpdate } from '@codemirror/view';
import codemirrorUtil from '@/lib/codemirror/util';

function useSyncSlideInfoExtension(
    handleChangeSlideInfo: (
        title: string | undefined,
        currentSlideTitle: string | undefined,
        currentSlideNumber: number,
        totalSlideCount: number
    ) => void
) {
    return useMemo(() => {
        return EditorView.updateListener.of((update: ViewUpdate) => {
            const { state } = update;

            const currentLineNumber =
                codemirrorUtil.getCurrentLineNumber(state);

            let lineNum = 1;
            let totalSlideCount = 1;
            let currentSlideNumber = 1;
            let title: string | undefined = '';
            let slideTitleArray: (string | undefined)[] = [];
            let isSearchTitleMode = true;
            const iterLine = state.doc.iterLines();
            while (!iterLine.done) {
                if (iterLine.value === '---') {
                    // Handle no slide title case
                    if (totalSlideCount > 1 && isSearchTitleMode) {
                        slideTitleArray.push('');
                    }

                    totalSlideCount++;
                    isSearchTitleMode = true;
                }

                if (isSearchTitleMode && iterLine.value.startsWith('#')) {
                    isSearchTitleMode = false;
                    const parsedTitle = iterLine.value.split(/# /);
                    if (parsedTitle.length > 1) {
                        if (totalSlideCount === 1) {
                            title = parsedTitle[1];
                        }
                        slideTitleArray.push(parsedTitle[1]);
                    }
                }

                if (lineNum === currentLineNumber) {
                    currentSlideNumber = totalSlideCount;
                }
                lineNum++;

                iterLine.next();
            }

            handleChangeSlideInfo(
                title,
                slideTitleArray[currentSlideNumber - 1],
                currentSlideNumber,
                totalSlideCount
            );
        });
    }, []);
}

export default useSyncSlideInfoExtension;
