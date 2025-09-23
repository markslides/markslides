import { useRef, useEffect, useMemo, useCallback } from 'react';
import Marp from '@marp-team/marp-core';
import useRefreshCopyFenceContent from '@/hooks/useRefreshCopyFenceContent';
import appMarp from '@/lib/marp/appMarp';
import slideConfigUtil from '@/lib/utils/slideConfigUtil';
import type { SlideConfigState } from '@/lib/types/common';

function useIndependentMarpRender(
    containerClassName: string,
    slideConfig: string | SlideConfigState,
    content: string
) {
    const containerClassNameRef = useRef<string | null>(null);
    const marpInstanceRef = useRef<Marp | null>(null);

    const { html, css, comments } = useMemo(() => {
        if (content) {
            try {
                const config =
                    typeof slideConfig === 'string'
                        ? slideConfig
                        : slideConfigUtil.generateMarpConfigFromSlideConfigState(
                              slideConfig
                          );

                if (
                    containerClassNameRef.current === null ||
                    containerClassNameRef.current !== containerClassName ||
                    !marpInstanceRef.current
                ) {
                    containerClassNameRef.current = containerClassName;
                    marpInstanceRef.current =
                        appMarp.createInstance(containerClassName);
                }

                return marpInstanceRef.current.render(
                    `---\n${config}\n---\n\n${content}`
                );
            } catch (error) {
                console.error(error);
            }
        }

        return { html: null, css: null, comments: null };
    }, [slideConfig, content, containerClassName]);

    const refreshMermaid = useCallback(() => {
        if (marpInstanceRef.current) {
            // marpInstanceRef.current.markdown.mermaid.contentLoaded();
            marpInstanceRef.current.markdown.mermaid.renderAll();
        }
    }, []);

    const refreshCopyFenceContent = useRefreshCopyFenceContent();

    const refresh = useCallback(() => {
        refreshMermaid();
        refreshCopyFenceContent();
    }, []);

    useEffect(() => {
        refresh();
    });

    return { html, css, comments, refresh };
}

export default useIndependentMarpRender;
