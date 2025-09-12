'use client';

import { useMemo, useRef } from 'react';
import MarkSlidesEditor, { type MarkSlidesEditorRef } from '@markslides/editor';
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
import { Box } from '@markslides/ui/box';
import useAppDispatch from '@/redux/hooks/useAppDispatch';
import useAppSelector from '@/redux/hooks/useAppSelector';
import { setContentRequested } from '@/redux/slices/localSlice';
import { setSlideInfo } from '@/redux/slices/editorSlice';
import SlideShowFragment from '@/components/fragments/SlideShowFragment';
import slideConfigUtil from '@/lib/utils/slideConfigUtil';

function EditorPage(): JSX.Element {
    const editorRef = useRef<MarkSlidesEditorRef>(null);

    const isSlideShowMode = useAppSelector(
        (state) => state.app.isSlideShowMode
    );
    const slideConfigState = useAppSelector((state) => state.slideConfig);
    const slideInfo = useAppSelector((state) => state.editor.slideInfo);
    const localContent = useAppSelector((state) => state.local.content);
    const dispatch = useAppDispatch();

    const markdownContent = useAppSelector((state) => state.local.content);

    const toolbarCommands = useMemo(() => {
        return [
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
        ];
    }, []);

    const slideConfig = useMemo(() => {
        return slideConfigUtil.generateMarpConfigFromSlideConfigState(
            slideConfigState
        );
    }, [slideConfigState]);

    return (
        <Box height='100%'>
            <MarkSlidesEditor
                ref={editorRef}
                height='inherit'
                toolbarCommands={toolbarCommands}
                config={slideConfigState}
                isFixScrollToBottom={false}
                isOverwriteMode={false}
                slideInfo={slideInfo}
                onChangeSlideInfo={(newSlideInfo) => {
                    dispatch(setSlideInfo(newSlideInfo));
                }}
                placeholder='# Hi, MarkSlides!'
                value={markdownContent}
                onChange={(newValue) => {
                    dispatch(setContentRequested(newValue));
                }}
            />

            {isSlideShowMode && (
                <SlideShowFragment
                    mode='audience'
                    content={localContent}
                    config={slideConfig}
                />
            )}
        </Box>
    );
}

export default EditorPage;
