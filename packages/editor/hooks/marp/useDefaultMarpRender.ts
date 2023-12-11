import { useEffect, useMemo } from 'react';
import appMarp from '@/lib/marp/appMarp';
import type { SlideConfigState } from '@/lib/types/common';

function useDefaultMarpRender(config: SlideConfigState, content: string) {
    const { html, css, comments } = useMemo(() => {
        if (content) {
            return appMarp
                .getDefaultInstance()
                .render(`---\n${config}\n---\n\n${content}`);
        }

        return { html: null, css: null, comments: null };
    }, [config, content]);

    useEffect(() => {
        appMarp.getDefaultInstance().markdown.mermaid.contentLoaded();
    }, [html]);

    return { html, css, comments };
}

export default useDefaultMarpRender;
