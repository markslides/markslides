import { useMemo } from 'react';
import appMarked from '@/lib/marked/appMarked';

function useMarkedRender(content: string) {
    const renderedContent = useMemo(() => {
        return appMarked.getDefaultInstance().render(content);
    }, [content]);

    return {
        renderedContent,
    };
}

export default useMarkedRender;
