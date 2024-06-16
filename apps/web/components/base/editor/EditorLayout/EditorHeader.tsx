import { Flex } from '@markslides/ui/flex';
import { Button } from '@markslides/ui/button';
import { Text } from '@markslides/ui/text';
import { PlayIcon } from 'lucide-react';

function EditorHeader() {
    return (
        <Flex
            height='40px'
            justifyContent='space-between'
            backgroundColor='white'>
            <Text color='black'>MarkSlides</Text>

            <Button icon={<PlayIcon size={14} />}>Slide Show</Button>
        </Flex>
    );
}

export default EditorHeader;
