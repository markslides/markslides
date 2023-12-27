'use client';

import { useState } from 'react';
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
// import type { ToolbarCommand } from '@markslides/editor/toolbar';

function Page(): JSX.Element {
    const [value, setValue] = useState('');

    return (
        <MarkSlidesEditor
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
                class: 'invert',
                size: '16:9',
            }}
            isFixScrollToBottom={false}
            value={value}
            onChange={(newValue) => {
                setValue(newValue);
            }}
        />
    );
}

export default Page;
