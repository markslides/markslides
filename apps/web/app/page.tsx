'use client';

import { useState, useCallback } from 'react';
import MarkSlidesEditor from '@markslides/editor';
import {
    undo,
    redo,
    heading,
    bold,
    italic,
    strike,
    underline,
    blockQuotes,
    orderedList,
    unorderedList,
    todoList,
    link,
    image,
    code,
    codeBlock,
    mermaid,
} from '@markslides/editor/toolbar';
import type { RenderMode, SlideInfo } from '@markslides/editor';
// import type { ToolbarCommand } from '@markslides/editor/toolbar';

function Page(): JSX.Element {
    const [renderMode, setRenderMode] = useState<RenderMode>('slide');
    const [value, setValue] = useState('');

    const [slideInfo, setSlideInfo] = useState<SlideInfo>({
        title: '',
        currentSlideTitle: '',
        currentSlideNumber: 0,
        totalSlideCount: 0,
    });

    const toggleRenderMode = useCallback(() => {
        setRenderMode((prevRenderMode) => {
            if (prevRenderMode === 'slide') {
                return 'document';
            }
            return 'slide';
        });
    }, []);

    return (
        <MarkSlidesEditor
            renderMode={renderMode}
            toggleRenderMode={toggleRenderMode}
            toolbarCommands={[
                undo,
                redo,
                heading,
                bold,
                italic,
                strike,
                underline,
                blockQuotes,
                orderedList,
                unorderedList,
                todoList,
                link,
                image,
                code,
                codeBlock,
                mermaid,
            ]}
            config={{
                header: 'MarkSlides',
                footer: 'Soaple',
                paginate: true,
                theme: 'default',
                class: 'normal',
                size: '16:9',
            }}
            isFixScrollToBottom={false}
            slideInfo={slideInfo}
            onChangeSlideInfo={(newSlideInfo) => {
                setSlideInfo(newSlideInfo);
            }}
            value={value}
            onChange={(newValue) => {
                setValue(newValue);
            }}
        />
    );
}

export default Page;
