import { useMemo, memo } from 'react';
import { useIndependentMarpRender } from '@markslides/renderer';

interface SlideListItemProps {
    id: string;
    config: string;
    content: string;
}

function SlideListItem(props: SlideListItemProps) {
    const { id, config, content } = props;

    const firstPageContent = useMemo(() => {
        return content.split('---')[0];
    }, [content]);

    const { html, css, comments } = useIndependentMarpRender(
        id,
        config,
        firstPageContent
    );

    return (
        <div>
            <style>{css}</style>
            {html ? (
                <div
                    dangerouslySetInnerHTML={{
                        __html: html,
                    }}
                />
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

export default memo(SlideListItem);
