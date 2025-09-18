import { useMemo } from 'react';
import { showPanel, EditorView, ViewUpdate, Panel } from '@codemirror/view';
import { Extension } from '@codemirror/state';
import codemirrorUtil from '@/lib/codemirror/util';

function useBottomPanelExtension() {
    const element = useMemo(() => {
        if (typeof window === 'undefined') {
            return null;
        }

        const element = document.createElement('div');
        element.setAttribute(
            'style',
            `
padding: 2px 8px;
font-size: 12px;`
                .replaceAll('\n', '')
                .trim()
        );
        return element;
    }, []);

    return useMemo<Extension>(() => {
        if (!element) {
            return showPanel.of(null);
        }

        const panelConstructor = (view: EditorView): Panel => {
            const { currentPageNumber, totalPageCount } =
                codemirrorUtil.getPageInfo(view.state);

            element.textContent = `Current page: ${currentPageNumber}/${totalPageCount}`;
            return {
                dom: element,
                // mount: () => {},
                update: (update: ViewUpdate) => {
                    const { currentPageNumber, totalPageCount } =
                        codemirrorUtil.getPageInfo(update.state);

                    element.textContent = `Current page: ${currentPageNumber}/${totalPageCount}`;
                },
                // destroy: () => {},
            };
        };

        return showPanel.of(panelConstructor);
    }, [element]);
}

export default useBottomPanelExtension;
