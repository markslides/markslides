import { Flex } from '@markslides/ui/flex';
import { Button } from '@markslides/ui/button';
import { Text } from '@markslides/ui/text';
import { PlayIcon } from 'lucide-react';
import useAppDispatch from '@/redux/hooks/useAppDispatch';
import { setIsSlideShowMode } from '@/redux/slices/appSlice';

function EditorHeader() {
    const dispatch = useAppDispatch();

    return (
        <Flex
            height='40px'
            justifyContent='space-between'
            backgroundColor='white'>
            <Text color='black'>MarkSlides</Text>

            <Button
                icon={<PlayIcon size={14} />}
                onClick={() => {
                    dispatch(setIsSlideShowMode(true));
                }}>
                Slide Show
            </Button>
        </Flex>
    );
}

export default EditorHeader;
