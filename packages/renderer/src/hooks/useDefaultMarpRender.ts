import { useEffect, useMemo, useCallback } from 'react';
import useRefreshCopyFenceContent from '@/hooks/useRefreshCopyFenceContent';
import appMarp from '@/lib/marp/appMarp';
import slideConfigUtil from '@/lib/utils/slideConfigUtil';
import type { SlideConfigState } from '@/lib/types/common';

function useDefaultMarpRender(
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
                    .getDefaultInstance()
                    .render(`---\n${config}\n---\n\n${content}`);
            } catch (error) {
                console.error(error);
            }
        }

        return { html: null, css: null, comments: null };
    }, [slideConfig, content]);

    // const refreshMermaid = useCallback(() => {
    //     appMarp.getDefaultInstance().markdown.mermaid.contentLoaded();
    // }, []);

    const refreshCopyFenceContent = useRefreshCopyFenceContent();

    const refresh = useCallback(() => {
        // refreshMermaid();
        refreshCopyFenceContent();
    }, []);

    useEffect(() => {
        refresh();
    });

    return { html, css, comments, refresh };
}

export default useDefaultMarpRender;
