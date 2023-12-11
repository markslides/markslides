import { useMemo } from 'react';
import { showPanel, EditorView, ViewUpdate, Panel } from '@codemirror/view';
import { Extension } from '@codemirror/state';

function useBottomPanelExtension(
    currentSlideNum: number,
    totalSlideCount: number
) {
    const element = useMemo(() => {
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
        const panelConstructor = (view: EditorView): Panel => {
            element.textContent = `Current slide: ${currentSlideNum}/${totalSlideCount}`;
            return {
                dom: element,
                // mount: () => {},
                update: (update: ViewUpdate) => {
                    if (update.docChanged) {
                        element.textContent = `Current slide: ${currentSlideNum}/${totalSlideCount}`;
                    }
                },
                // destroy: () => {},
            };
        };

        return showPanel.of(panelConstructor);
    }, [element, currentSlideNum, totalSlideCount]);
}

export default useBottomPanelExtension;
