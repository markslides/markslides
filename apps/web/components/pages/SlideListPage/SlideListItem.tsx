import { useMemo, memo } from 'react';
import { useIndependentMarpRender } from '@markslides/renderer';
import { useTranslations } from 'next-intl';

interface SlideListItemProps {
    id: string;
    config: string;
    content: string;
}

function SlideListItem(props: SlideListItemProps) {
    const { id, config, content } = props;
    const t = useTranslations();

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
                <div>{t('loading')}</div>
            )}
        </div>
    );
}

export default memo(SlideListItem);
