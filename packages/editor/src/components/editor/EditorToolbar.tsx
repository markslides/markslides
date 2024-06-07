import { ForwardedRef, forwardRef } from 'react';
import styled from 'styled-components';
import { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { GalleryVerticalIcon, FileTextIcon } from 'lucide-react';
import appConst from '@/lib/constants/appConst';
import type { ToolbarCommand } from '@/toolbar';
import type { RenderMode } from '@/lib/types/common';

const TOOLBAR_HEIGHT = 32;

const Wrapper = styled.div`
    height: ${TOOLBAR_HEIGHT}px;
    display: flex;
    flex-wrap: wrap;
    background-color: white;
    box-shadow: 0 -1px 0 0 #eeeeee inset;
`;

const ToolbarItem = styled.button`
    all: unset;
    width: 32px;
    height: ${TOOLBAR_HEIGHT}px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    background-color: transparent;
    &:hover {
        background-color: #dddddd;
    }
`;

const Filler = styled.div`
    flex: 1;
`;

export interface EditorToolbarProps {
    renderMode?: RenderMode;
    toggleRenderMode?: () => void;
    toolbarCommands: ToolbarCommand[];
    codeMirrorRef: ReactCodeMirrorRef | null;
}

function EditorToolbar(
    props: EditorToolbarProps,
    forwardedRef: ForwardedRef<HTMLDivElement>
) {
    const { renderMode, toggleRenderMode, toolbarCommands, codeMirrorRef } =
        props;

    return (
        <Wrapper
            id={appConst.EDITOR_TOOLBAR_ID}
            ref={forwardedRef}>
            {toolbarCommands.map((toolbarCommand) => {
                return (
                    <ToolbarItem
                        key={toolbarCommand.name}
                        aria-label={toolbarCommand.name}
                        onClick={() => {
                            if (codeMirrorRef) {
                                toolbarCommand.execute(codeMirrorRef);
                            }
                        }}>
                        {toolbarCommand.icon}
                    </ToolbarItem>
                );
            })}

            <Filler />

            <ToolbarItem
                aria-label='toggle render mode'
                onClick={toggleRenderMode}>
                {renderMode === 'slide' ? (
                    <FileTextIcon
                        size={16}
                        strokeWidth={2}
                    />
                ) : (
                    <GalleryVerticalIcon
                        size={16}
                        strokeWidth={2}
                    />
                )}
            </ToolbarItem>
        </Wrapper>
    );
}

export default forwardRef(EditorToolbar);
