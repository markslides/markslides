import { useEffect, useMemo, useCallback } from 'react';
import appMarp from '@/lib/marp/appMarp';
import slideConfigUtil from '@/lib/utils/slideConfigUtil';
import type { SlideConfigState } from '@/lib/types/common';

function useIndependentMarpRender(
    containerClassName: string,
    slideConfig: string | SlideConfigState,
    content: string
) {
    const { html, css, comments } = useMemo(() => {
        if (content) {
            try {
                const config =
                    typeof slideConfig === 'string'
                        ? slideConfig
                        : slideConfigUtil.generateMarpConfigFromSlideConfigState(
                              slideConfig
                          );

                return appMarp
                    .createInstance(containerClassName)
                    .render(`---\n${config}\n---\n\n${content}`);
            } catch (error) {
                console.error(error);
            }
        }

        return { html: null, css: null, comments: null };
    }, [slideConfig, content, containerClassName]);

    const refresh = useCallback(() => {
        appMarp.getDefaultInstance().markdown.mermaid.contentLoaded();
    }, []);

    useEffect(() => {
        refresh();
    });

    return { html, css, comments, refresh };
}

export default useIndependentMarpRender;
