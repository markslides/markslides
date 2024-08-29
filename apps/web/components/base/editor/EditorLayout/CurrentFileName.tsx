import { Flex } from '@markslides/ui/flex';
import { Text } from '@markslides/ui/text';
import { Tooltip } from '@markslides/ui/tooltip';
import useAppSelector from '@/redux/hooks/useAppSelector';

interface CurrentFileNameProps {}

function CurrentFileName(props: CurrentFileNameProps) {
    const currentFileHandle = useAppSelector(
        (state) => state.app.currentFileHandle
    );

    if (currentFileHandle) {
        return (
            <Flex
                marginRight='16px'
                alignItems='center'
                cursor='pointer'>
                <Tooltip
                    hasArrow={true}
                    placement='bottom'
                    label='Current file'
                    aria-label='current file tooltip'>
                    <Text
                        fontSize='0.8rem'
                        color='black'>
                        {currentFileHandle.name}
                    </Text>
                </Tooltip>
            </Flex>
        );
    }

    return null;
}

export default CurrentFileName;
