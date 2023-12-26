'use client';

import { useState, useMemo, useRef, useCallback } from 'react';
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
import type { SlideConfigState } from '@markslides/renderer';

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
        readOnly,
        value,
        onChange,
    } = props;

    const codeMirrorRef = useRef<ReactCodeMirrorRef>(null);
    const editorViewRef = useRef<EditorView | null>(null);
    const editorStateRef = useRef<EditorState | null>(null);

    const [currentCursorPosition, setCurrentCursorPosition] = useState(0);
    const [currentLineNumber, setCurrentLineNumber] = useState(0);
    const [currentSlideNumber, setCurrentSlideNumber] = useState(0);
    const [totalSlideCount, setTotalSlideCount] = useState(0);
    const [currentSelection, setCurrentSelection] = useState('');

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

    const handleChangeSlideInfo = useCallback(
        (
            title: string | undefined,
            currentSlideTitle: string | undefined,
            currentSlideNumber: number,
            totalSlideCount: number
        ) => {
            setCurrentSlideNumber(currentSlideNumber);
            setTotalSlideCount(totalSlideCount);
        },
        []
    );

    const syncCurrentCursorPositionExtension =
        useSyncCurrentCursorPositionExtension(handleChangeCursorPosition);
    const syncCurrentLineNumberExtension = useSyncCurrentLineNumberExtension(
        handleChangeLineNumber
    );
    const syncCurrentSelectionExtension = useSyncCurrentSelectionExtension(
        handleChangeSelectionStr
    );
    const syncSlideInfoExtension = useSyncSlideInfoExtension(
        handleChangeSlideInfo
    );
    const bottomPanelExtension = useBottomPanelExtension(
        currentSlideNumber,
        totalSlideCount
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
                    onCreateEditor={(view: EditorView, state: EditorState) => {
                        editorViewRef.current = view;
                        editorStateRef.current = state;
                    }}
                    readOnly={readOnly}
                    value={value}
                    onChange={onChange}
                />

                <VerticalDivider />

                <PreviewContainer>
                    <PreviewFragment
                        config={config}
                        content={value ?? ''}
                        currentCursorPosition={currentCursorPosition}
                        currentSlideNum={currentSlideNumber}
                    />
                </PreviewContainer>
            </EditorContainer>
        </Wrapper>
    );
}

export default MarkSlidesEditor;
