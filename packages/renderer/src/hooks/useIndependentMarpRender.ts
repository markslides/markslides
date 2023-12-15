import { useEffect, useMemo } from 'react';
import appMarp from '@//lib/marp/appMarp';
import slideConfigUtil from '@//lib/utils/slideConfigUtil';
import type { SlideConfigState } from '@//lib/types/common';

function useIndependentMarpRender(
    containerClassName: string,
    slideConfigState: SlideConfigState,
    content: string
) {
    const { html, css, comments } = useMemo(() => {
        if (content) {
            const config =
                slideConfigUtil.generateMarpConfigFromSlideConfigState(
                    slideConfigState
                );

            return appMarp
                .createInstance(containerClassName)
                .render(`---\n${config}\n---\n\n${content}`);
        }

        return { html: null, css: null, comments: null };
    }, [slideConfigState, content, containerClassName]);

    useEffect(() => {
        appMarp.getDefaultInstance().markdown.mermaid.contentLoaded();
    }, [html]);

    return { html, css, comments };
}

export default useIndependentMarpRender;
