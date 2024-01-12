'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { EditorView } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import ReactCodeMirror, {
    type ReactCodeMirrorProps,
    type ReactCodeMirrorRef,
} from '@uiw/react-codemirror';
import { githubLight } from '@uiw/codemirror-themes-all';
import useSyncCurrentCursorPositionExtension from '@/hooks/codemirror/useSyncCurrentCursorPositionExtension';
import useSyncCurrentLineNumberExtension from '@/hooks/codemirror/useSyncCurrentLineNumberExtension';
import useSyncCurrentSelectionExtension from '@/hooks/codemirror/useSyncCurrentSelectionExtension';
import useSyncSlideInfoExtension from '@/hooks/codemirror/useSyncSlideInfoExtension';
import useBottomPanelExtension from '@/hooks/codemirror/useBottomPanelExtension';
import PreviewFragment from '@/components/fragments/PreviewFragment';
import EditorToolbar, {
    type EditorToolbarProps,
} from '@/components/editor/EditorToolbar';
import shortcutExtension from '@/lib/codemirror/shortcutExtension';
import defaultToolbarCommands from '@/toolbar/commands';
import codemirrorUtil from '@/lib/codemirror/util';
import type { SlideConfigState } from '@markslides/renderer';
import type { SlideInfo } from '@/lib/types/common';

const Wrapper = styled.div<{ $height: number | string }>`
    height: ${({ $height }) => $height};
    display: flex;
    flex-direction: column;
`;

const EditorContainer = styled.div`
    height: calc(100% - 32px);
    display: flex;
    flex-direction: row;
    align-items: stretch;
`;

const PreviewContainer = styled.div`
    flex: 1;
    overflow-y: scroll;
`;

const VerticalDivider = styled.div`
    width: 1px;
    height: 100%;
    background-color: #dddddd;
`;

const styleTheme = EditorView.baseTheme({
    '&.cm-editor.cm-focused': {
        outline: 'none',
    },
});

interface MarkSlidesEditorProps
    extends Pick<ReactCodeMirrorProps, 'readOnly' | 'value' | 'onChange'>,
        Partial<Pick<EditorToolbarProps, 'toolbarCommands'>> {
    height?: number | string;
    config?: SlideConfigState;
    isFixScrollToBottom?: boolean;
    slideInfo: SlideInfo;
    onChangeSlideInfo: (newSlideInfo: SlideInfo) => void;
}

const DEFAULT_SLIDE_CONFIG: SlideConfigState = {
    header: '',
    footer: '',
    paginate: true,
    theme: 'default',
    class: 'normal',
    size: '16:9',
};

function MarkSlidesEditor(props: MarkSlidesEditorProps) {
    const {
        toolbarCommands = defaultToolbarCommands,
        height = '100vh',
        config = DEFAULT_SLIDE_CONFIG,
        isFixScrollToBottom = false,
        slideInfo,
        onChangeSlideInfo,
        readOnly,
        value,
        onChange,
    } = props;

    const codeMirrorRef = useRef<ReactCodeMirrorRef>(null);
    // const editorViewRef = useRef<EditorView | null>(null);
    // const editorStateRef = useRef<EditorState | null>(null);

    const previewContainerRef = useRef<HTMLDivElement>(null);

    const [currentCursorPosition, setCurrentCursorPosition] = useState(0);
    const [currentLineNumber, setCurrentLineNumber] = useState(0);
    const [currentSelection, setCurrentSelection] = useState('');

    useEffect(() => {
        if (isFixScrollToBottom && value) {
            const view = codeMirrorRef.current?.view;
            if (view) {
                view.scrollDOM.scrollTo({
                    top: view.scrollDOM.scrollHeight,
                    behavior: 'instant',
                });

                view.dispatch({
                    selection: {
                        anchor: value.length,
                        head: value.length,
                    },
                });
            }

            if (previewContainerRef.current) {
                previewContainerRef.current.scrollTo({
                    top: previewContainerRef.current.scrollHeight,
                    behavior: 'instant',
                });
            }
        }
    }, [value]);

    const handleChangeCursorPosition = useCallback(
        (newCursorPosition: number) => {
            setCurrentCursorPosition(newCursorPosition);
        },
        []
    );

    const handleChangeLineNumber = useCallback((newLineNumber: number) => {
        setCurrentLineNumber(newLineNumber);
    }, []);

    const handleChangeSelectionStr = useCallback((newSelection: string) => {
        setCurrentSelection(newSelection);
    }, []);

    const syncCurrentCursorPositionExtension =
        useSyncCurrentCursorPositionExtension(handleChangeCursorPosition);
    const syncCurrentLineNumberExtension = useSyncCurrentLineNumberExtension(
        handleChangeLineNumber
    );
    const syncCurrentSelectionExtension = useSyncCurrentSelectionExtension(
        handleChangeSelectionStr
    );
    const syncSlideInfoExtension = useSyncSlideInfoExtension(
        slideInfo,
        onChangeSlideInfo
    );
    const bottomPanelExtension = useBottomPanelExtension(
        slideInfo.currentSlideNumber,
        slideInfo.totalSlideCount
    );

    const extensions = useMemo(() => {
        return [
            styleTheme,
            shortcutExtension,
            markdown({
                base: markdownLanguage,
                codeLanguages: languages,
            }),
            EditorView.lineWrapping,
            syncCurrentCursorPositionExtension,
            syncCurrentLineNumberExtension,
            syncCurrentSelectionExtension,
            syncSlideInfoExtension,
            bottomPanelExtension,
        ];
    }, [
        syncCurrentCursorPositionExtension,
        syncCurrentLineNumberExtension,
        syncCurrentSelectionExtension,
        syncSlideInfoExtension,
        bottomPanelExtension,
    ]);

    const handleClickSlide = useCallback((slide: Element, index: number) => {
        if (!codeMirrorRef.current) {
            return;
        }

        const { view } = codeMirrorRef.current;
        if (!view) {
            return;
        }
        // NOTE: Do not use codeMirrorRef.current.state, because it doen't updated in correctly
        const state = view.state;

        const line = codemirrorUtil.getLineFromSlideIndex(state, index);

        view.dispatch({
            selection: { head: line.from, anchor: line.from },
            // scrollIntoView: true,
        });
        view.focus();

        const lineBlockAt = view.lineBlockAt(line.from);
        if (lineBlockAt) {
            const scroller = view.scrollDOM.getBoundingClientRect();
            const middle = lineBlockAt.top - scroller.height / 2;

            view.scrollDOM.scrollTo({
                top: middle,
                behavior: 'smooth',
            });
        }
    }, []);

    return (
        <Wrapper $height={height}>
            <EditorToolbar
                toolbarCommands={toolbarCommands}
                codeMirrorRef={codeMirrorRef.current}
            />

            <EditorContainer>
                <ReactCodeMirror
                    ref={codeMirrorRef}
                    height='100%'
                    style={{
                        flex: '1',
                    }}
                    theme={githubLight}
                    extensions={extensions}
                    // onCreateEditor={(view: EditorView, state: EditorState) => {
                    //     editorViewRef.current = view;
                    //     editorStateRef.current = state;
                    // }}
                    readOnly={readOnly}
                    value={value}
                    onChange={onChange}
                />

                <VerticalDivider />

                <PreviewContainer ref={previewContainerRef}>
                    <PreviewFragment
                        config={config}
                        content={value ?? ''}
                        currentCursorPosition={currentCursorPosition}
                        currentSlideNum={slideInfo.currentSlideNumber}
                        onClickSlide={handleClickSlide}
                    />
                </PreviewContainer>
            </EditorContainer>
        </Wrapper>
    );
}

export default MarkSlidesEditor;
