'use client';

import {
    useState,
    useEffect,
    useMemo,
    useRef,
    useCallback,
    forwardRef,
    ForwardedRef,
} from 'react';
import styled from 'styled-components';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { EditorView } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { history as historyExtension } from '@codemirror/commands';
import { lintGutter } from '@codemirror/lint';
import { parseMixed } from '@lezer/common';
import ReactCodeMirror, {
    type ReactCodeMirrorProps,
    type ReactCodeMirrorRef,
} from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';
import { color as colorPickerExtension } from '@uiw/codemirror-extensions-color';
import { githubLight } from '@uiw/codemirror-themes-all';
import type { SlideConfigState } from '@markslides/renderer';
import useBottomPanelExtension from '@/hooks/codemirror/useBottomPanelExtension';
import PreviewFragment, {
    type PreviewFragmentRef,
} from '@/components/fragments/PreviewFragment';
import EditorToolbar, {
    type EditorToolbarProps,
} from '@/components/editor/EditorToolbar';
import CurrentPageSyncButton from '@/components/editor/CurrentPageSyncButton';
import shortcutExtension from '@/lib/codemirror/shortcutExtension';
import dividerHighlightExtension from '@/lib/codemirror/dividerHighlightExtension';
import lintExtension from '@/lib/codemirror/lintExtension';
import slideInfoExtension from '@/lib/codemirror/slideInfoExtension';
import cursorContextExtension from '@/lib/codemirror/cursorContextExtension';
import overwriteModeExtension from '@/lib/codemirror/overwriteModeExtension';
import defaultToolbarCommands from '@/toolbar/commands';
import codemirrorUtil from '@/lib/codemirror/util';
import type { SlideInfo } from '@/lib/types/common';

const extendedMarkdownLanguage = markdown({
    base: markdownLanguage,
    codeLanguages: languages,
    extensions: {
        wrap: parseMixed((node) => {
            if (node.name === 'HTMLBlock') {
                return {
                    parser: langs.css().language.parser,
                };
            }
            return null;
        }),
    },
});

const pageDividerTheme = EditorView.baseTheme({
    '&dark .cm-page-divider': {
        backgroundColor: '#FFFFFF44',
        fontWeight: 'bold',
    },
    '&light .cm-page-divider': {
        backgroundColor: '#00000033',
        fontWeight: 'bold',
    },
});

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
    position: relative;
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

const overwriteCursorTheme = EditorView.baseTheme({
    '&.cm-editor .cm-cursor': {
        borderLeft: 'none',
        borderBottom: '2px solid',
        width: '0.6em',
        marginLeft: '0',
    },
    '&.cm-editor.cm-focused .cm-cursor': {
        borderLeft: 'none',
        borderBottom: '2px solid',
        width: '0.6em',
        marginLeft: '0',
    },
});

export interface MarkSlidesEditorRef extends ReactCodeMirrorRef {}

interface MarkSlidesEditorProps
    extends Pick<
            ReactCodeMirrorProps,
            'placeholder' | 'extensions' | 'readOnly' | 'value' | 'onChange'
        >,
        Partial<Pick<EditorToolbarProps, 'toolbarCommands'>> {
    height?: number | string;
    config?: SlideConfigState;
    isFixScrollToBottom?: boolean;
    isOverwriteMode?: boolean;
    onChangeSlideInfo?: (newSlideInfo: SlideInfo) => void;
}

const DEFAULT_SLIDE_CONFIG: SlideConfigState = {
    header: '',
    footer: '',
    paginate: true,
    theme: 'default',
    class: 'normal',
    size: '16:9',
};

function MarkSlidesEditor(
    props: MarkSlidesEditorProps,
    ref: ForwardedRef<MarkSlidesEditorRef>
) {
    const {
        toolbarCommands = defaultToolbarCommands,
        height = '100vh',
        config = DEFAULT_SLIDE_CONFIG,
        isFixScrollToBottom = false,
        isOverwriteMode = false,
        onChangeSlideInfo,
        placeholder,
        extensions: externalExtensions = [],
        readOnly,
        value,
        onChange,
    } = props;

    const codeMirrorRef = useRef<ReactCodeMirrorRef | null>(null);
    // const editorViewRef = useRef<EditorView | null>(null);
    // const editorStateRef = useRef<EditorState | null>(null);

    const previewContainerRef = useRef<HTMLDivElement>(null);
    const previewRef = useRef<PreviewFragmentRef>(null);

    const [isSyncCurrentPage, setIsSyncCurrentPage] = useState(true);

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

    const bottomPanelExtension = useBottomPanelExtension();

    const extensions = useMemo(() => {
        let _extensions = [
            historyExtension(),
            styleTheme,
            ...(isOverwriteMode ? [overwriteCursorTheme] : []),
            shortcutExtension,
            colorPickerExtension,
            dividerHighlightExtension,
            lintExtension,
            // lintGutter(),
            extendedMarkdownLanguage,
            EditorView.lineWrapping,
            // cursorContextExtension((cursorContext) => {
            //     const { cursorPosition, lineNumber, selectionStr } =
            //         cursorContext;

            //     // NOTE: Add something to use these values
            // }),
            slideInfoExtension((slideInfo) => {
                if (previewRef.current) {
                    previewRef.current.setCurrentPage(
                        slideInfo.currentPageNumber,
                        isSyncCurrentPage
                    );
                }

                if (!!onChangeSlideInfo) {
                    onChangeSlideInfo(slideInfo);
                }
            }),
            bottomPanelExtension,
            ...externalExtensions,
        ];

        if (isOverwriteMode) {
            _extensions.push(overwriteModeExtension);
        }

        return _extensions;
    }, [
        isOverwriteMode,
        bottomPanelExtension,
        externalExtensions,
        overwriteModeExtension,
    ]);

    const handleClickSlide = useCallback(
        (slide: Element, index: number) => {
            if (!codeMirrorRef.current) {
                return;
            }

            const { view } = codeMirrorRef.current;
            if (!view) {
                return;
            }
            // NOTE: Do not use codeMirrorRef.current.state, because it doesn't updated in correctly
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
        },
        [codeMirrorRef.current]
    );

    const handleClickSyncCurrentPage = useCallback(() => {
        setIsSyncCurrentPage((prevIsSyncCurrentPage) => {
            return !prevIsSyncCurrentPage;
        });
    }, [isSyncCurrentPage]);

    return (
        <Wrapper $height={height}>
            <EditorToolbar
                toolbarCommands={toolbarCommands}
                codeMirrorRef={codeMirrorRef.current}
            />

            <EditorContainer>
                <ReactCodeMirror
                    ref={(_ref) => {
                        if (ref && typeof ref === 'function') {
                            ref(_ref);
                        } else if (ref && typeof ref === 'object') {
                            ref.current = _ref;
                        }

                        codeMirrorRef.current = _ref as ReactCodeMirrorRef;
                    }}
                    height='100%'
                    style={{
                        flex: '1',
                    }}
                    theme={[githubLight, pageDividerTheme]}
                    placeholder={placeholder}
                    extensions={extensions}
                    // onCreateEditor={(view: EditorView, state: EditorState) => {
                    //     editorViewRef.current = view;
                    //     editorStateRef.current = state;
                    // }}
                    readOnly={readOnly}
                    value={value}
                    onChange={onChange}
                    // TODO: Use this to update value
                    // onUpdate={(update) => {
                    //     // console.log('onUpdate', update);

                    //     if (onChange) {
                    //         onChange(update.state.doc.toString(), update);
                    //     }
                    // }}
                />

                <VerticalDivider />

                <PreviewContainer ref={previewContainerRef}>
                    <PreviewFragment
                        ref={previewRef}
                        config={config}
                        content={value ?? ''}
                        onClickSlide={handleClickSlide}
                    />
                </PreviewContainer>

                <CurrentPageSyncButton
                    isSyncCurrentPage={isSyncCurrentPage}
                    onToggle={handleClickSyncCurrentPage}
                />
            </EditorContainer>
        </Wrapper>
    );
}

export default forwardRef(MarkSlidesEditor);
