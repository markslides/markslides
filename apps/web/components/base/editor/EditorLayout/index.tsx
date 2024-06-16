'use client';

import { PropsWithChildren } from 'react';
import { Flex } from '@markslides/ui/flex';
import EditorHeader from '@/components/base/editor/EditorLayout/EditorHeader';
import EditorMenuBar from '@/components/base/editor/EditorLayout/EditorMenuBar';
import { Box } from '@markslides/ui/box';

interface EditorLayoutProps extends PropsWithChildren<{}> {}

function EditorLayout(props: EditorLayoutProps) {
    return (
        <Flex
            height='100vh'
            flexDirection='column'>
            <EditorHeader />

            <Flex
                height='32px'
                alignItems='center'
                justifyContent='space-between'
                backgroundColor='white'>
                <EditorMenuBar />
            </Flex>

            <Box
                width='100%'
                height='calc(100vh - 72px)'>
                {props.children}
            </Box>
        </Flex>
    );
}

export default EditorLayout;
