import { useRef, useState, useCallback, useEffect } from 'react';
import { useParams } from 'next/navigation';
// import { Fade } from '@chakra-ui/react';
import { Flex } from '@markslides/ui/flex';
import { IconButton } from '@markslides/ui/icon-button';
import { Center } from '@markslides/ui/center';
import { Tooltip } from '@markslides/ui/tooltip';
import {
    LogOutIcon,
    ChevronFirstIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronLastIcon,
    PresentationIcon,
    ExpandIcon,
} from 'lucide-react';

type SlideShowBottomMenuProps = {
    isPresenterMode: boolean;
    exitSlideShow: () => void;
    moveToFirstSlide: () => void;
    moveToPrevSlide: () => void;
    moveToNextSlide: () => void;
    moveToLastSlide: () => void;
    currentPageNo: number;
    totalPageCount: number;
};

function SlideShowBottomMenu(props: SlideShowBottomMenuProps) {
    const {
        isPresenterMode,
        exitSlideShow,
        moveToFirstSlide,
        moveToPrevSlide,
        moveToNextSlide,
        moveToLastSlide,
        currentPageNo,
        totalPageCount,
    } = props;

    const { slideId, publicationId } = useParams<{
        slideId?: string;
        publicationId?: string;
    }>();

    const timer = useRef<NodeJS.Timeout | null>(null);

    const [isShow, setIsShow] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const bottomMenuRef = useCallback((element: HTMLDivElement) => {
        if (element) {
            function handleMouseEnter() {
                setIsHovered(true);
            }

            function handleMouseLeave() {
                setIsHovered(false);
            }

            element.addEventListener('mouseenter', handleMouseEnter);
            element.addEventListener('mouseleave', handleMouseLeave);
        }
    }, []);

    useEffect(() => {
        function handleMouseMove() {
            setIsShow(true);
            if (timer.current) {
                clearTimeout(timer.current);
            }
            timer.current = setTimeout(() => {
                if (!isHovered) {
                    setIsShow(false);
                }
            }, 1000);
        }

        document.addEventListener('mousemove', handleMouseMove);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isHovered]);

    const handleClickFullscreen = useCallback(() => {
        var elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        }
        /* Safari */
        // @ts-ignore
        else if (elem.webkitRequestFullscreen) {
            // @ts-ignore
            elem.webkitRequestFullscreen();
        }
        /* IE11 */
        // @ts-ignore
        else if (elem.msRequestFullscreen) {
            // @ts-ignore
            elem.msRequestFullscreen();
        }
    }, []);

    const handleClickPresenterMode = useCallback(() => {
        const targetUrl = `${location.origin}/slide-show`;

        const slideShowUrl = new URL(targetUrl);
        slideShowUrl.searchParams.append('mode', 'presenter');
        slideShowUrl.searchParams.append('page', currentPageNo.toString());

        const presenterModeWindow = window.open(
            slideShowUrl,
            'presenterModeWindow',
            `'toolbar=no,scrollbars=no,resizable=yes,top=${
                window.innerHeight * 0.1
            },left=${window.innerWidth * 0.1},width=${
                window.innerWidth * 0.8
            },height=${window.innerHeight * 0.8}`
        );
    }, [currentPageNo, slideId, publicationId]);

    return (
        // <Fade in={isShow}>
            <Flex
                ref={bottomMenuRef}
                width='min-content'
                padding='16px'
                position='absolute'
                left='0'
                right='0'
                bottom='32px'
                margin='auto'
                alignItems='center'
                justifyContent='center'
                gap='4px'
                backgroundColor='blackAlpha.100'
                borderRadius='16px'>
                <Tooltip
                    hasArrow
                    placement='top'
                    label='First Page'
                    aria-label='first page tooltip'>
                    <IconButton
                        variant='unstyled'
                        icon={
                            <Center>
                                <ChevronFirstIcon fontSize='2rem' />
                            </Center>
                        }
                        color='gray'
                        _hover={{
                            color: 'white',
                        }}
                        aria-label='First page button'
                        isDisabled={currentPageNo === 1}
                        onMouseDown={(event) => {
                            event.stopPropagation();
                        }}
                        onClick={moveToFirstSlide}
                    />
                </Tooltip>

                <Tooltip
                    hasArrow
                    placement='top'
                    label='Prev Page'
                    aria-label='prev page tooltip'>
                    <IconButton
                        variant='unstyled'
                        icon={
                            <Center>
                                <ChevronLeftIcon fontSize='2rem' />
                            </Center>
                        }
                        color='gray'
                        _hover={{
                            color: 'white',
                        }}
                        aria-label='Prev page button'
                        isDisabled={currentPageNo === 1}
                        onMouseDown={(event) => {
                            event.stopPropagation();
                        }}
                        onClick={moveToPrevSlide}
                    />
                </Tooltip>

                <Tooltip
                    hasArrow
                    placement='top'
                    label='Full Screen'
                    aria-label='full screen tooltip'>
                    <IconButton
                        variant='unstyled'
                        icon={
                            <Center>
                                <ExpandIcon fontSize='2rem' />
                            </Center>
                        }
                        color='gray'
                        _hover={{
                            color: 'white',
                        }}
                        aria-label='full screen button'
                        onMouseDown={(event) => {
                            event.stopPropagation();
                        }}
                        onClick={handleClickFullscreen}
                    />
                </Tooltip>

                {!isPresenterMode && (
                    <>
                        <Tooltip
                            hasArrow
                            placement='top'
                            label='Presenter Mode'
                            aria-label='presenter mode tooltip'>
                            <IconButton
                                variant='unstyled'
                                icon={
                                    <Center>
                                        <PresentationIcon fontSize='2rem' />
                                    </Center>
                                }
                                color='gray'
                                _hover={{
                                    color: 'white',
                                }}
                                aria-label='Presenter mode button'
                                onMouseDown={(event) => {
                                    event.stopPropagation();
                                }}
                                onClick={handleClickPresenterMode}
                            />
                        </Tooltip>

                        <Tooltip
                            hasArrow
                            placement='top'
                            label='Exit'
                            aria-label='exit tooltip'>
                            <IconButton
                                variant='unstyled'
                                icon={
                                    <Center>
                                        <LogOutIcon fontSize='2rem' />
                                    </Center>
                                }
                                color='gray'
                                _hover={{
                                    color: 'white',
                                }}
                                aria-label='Exit slide show button'
                                onMouseDown={(event) => {
                                    event.stopPropagation();
                                }}
                                onClick={() => {
                                    exitSlideShow();
                                }}
                            />
                        </Tooltip>
                    </>
                )}

                <Tooltip
                    hasArrow
                    placement='top'
                    label='Next Page'
                    aria-label='next page tooltip'>
                    <IconButton
                        variant='unstyled'
                        icon={
                            <Center>
                                <ChevronRightIcon fontSize='2rem' />
                            </Center>
                        }
                        color='gray'
                        _hover={{
                            color: 'white',
                        }}
                        aria-label='Next page button'
                        isDisabled={currentPageNo === totalPageCount}
                        onMouseDown={(event) => {
                            event.stopPropagation();
                        }}
                        onClick={moveToNextSlide}
                    />
                </Tooltip>

                <Tooltip
                    hasArrow
                    placement='top'
                    label='Last Page'
                    aria-label='last page tooltip'>
                    <IconButton
                        variant='unstyled'
                        icon={
                            <Center>
                                <ChevronLastIcon fontSize='2rem' />
                            </Center>
                        }
                        color='gray'
                        _hover={{
                            color: 'white',
                        }}
                        aria-label='Last page button'
                        isDisabled={currentPageNo === totalPageCount}
                        onMouseDown={(event) => {
                            event.stopPropagation();
                        }}
                        onClick={moveToLastSlide}
                    />
                </Tooltip>
            </Flex>
        // </Fade>
    );
}

export default SlideShowBottomMenu;
