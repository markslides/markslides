import { ForwardedRef, forwardRef, RefObject, memo } from 'react';
import styled from 'styled-components';
import type { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import appConst from '@/lib/constants/appConst';
import type { ToolbarCommand } from '@/toolbar';

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

export interface EditorToolbarProps {
    toolbarCommands: ToolbarCommand[];
    codeMirrorRef: RefObject<ReactCodeMirrorRef | null>;
}

function EditorToolbar(
    props: EditorToolbarProps,
    forwardedRef: ForwardedRef<HTMLDivElement>
) {
    const { toolbarCommands, codeMirrorRef } = props;

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
                            if (codeMirrorRef.current) {
                                toolbarCommand.execute(codeMirrorRef.current);
                            }
                        }}>
                        {toolbarCommand.icon}
                    </ToolbarItem>
                );
            })}
        </Wrapper>
    );
}

export default memo(forwardRef(EditorToolbar), (prevProps, nextProps) => {
    return prevProps.toolbarCommands === nextProps.toolbarCommands;
});
