import { Flex } from '@markslides/ui/flex';
import { Button } from '@markslides/ui/button';
import { Image } from '@markslides/ui/image';
import { PlayIcon } from 'lucide-react';
import useAppDispatch from '@/redux/hooks/useAppDispatch';
import { setIsSlideShowMode } from '@/redux/slices/appSlice';

function EditorHeader() {
    const dispatch = useAppDispatch();

    return (
        <Flex
            height='40px'
            paddingLeft='16px'
            paddingRight='16px'
            alignItems='center'
            justifyContent='space-between'
            backgroundColor='white'>
            <Image
                src='logo_with_text.svg'
                style={{
                    width: 'auto',
                    height: '32px',
                }}
            />

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
