'use client';

import { useState, useEffect, useCallback, useMemo, MouseEvent } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';
import styled from 'styled-components';
import { XIcon } from 'lucide-react';
import { useDefaultMarpRender } from '@markslides/renderer';
import { Box } from '@markslides/ui/box';
import { Flex } from '@markslides/ui/flex';
import { Text } from '@markslides/ui/text';
import { Center } from '@markslides/ui/center';
import { Progress } from '@markslides/ui/progress';
import { IconButton } from '@markslides/ui/icon-button';
import useAppDispatch from '@/redux/hooks/useAppDispatch';
import { setIsSlideShowMode } from '@/redux/slices/appSlice';
import useSetSearchParam from '@/hooks/router/useSetSearchParam';
import useIsMobileDevice from '@/hooks/agent/useIsMobileDevice';
import useIsWindowFocused from '@/hooks/window/useIsWindowFocused';
import useActiveSlideIndex from '@/hooks/app/useActiveSlideIndex';
import useSlideRatio from '@/hooks/app/useSlideRatio';
import SlideExplorerFragment from '@/components/fragments/SlideExplorerFragment';
import SlideShowBottomMenu from '@/components/fragments/SlideShowFragment/SlideShowBottomMenu';
import broadcastChannelManager from '@/lib/managers/broadcastChannelManager';
import type { SlideShowMode } from '@/lib/types/common';

const Wrapper = styled.div`
    position: fixed;
    inset: 0;
    background-color: black;
    & > * {
        user-select: none;
    }
`;

// const SlidesContainer = styled.div<{
//     $aspectRatio: number;
//     $activeSlideIndex: number;
// }>`
//     .marpit {
//         width: 100%;
//         & > * {
//             width: inherit;
//             height: 100%;
//             position: absolute;
//             inset: 0;
//             margin: auto;
//             aspect-ratio: ${({ $aspectRatio }) => $aspectRatio};
//             visibility: hidden;
//         }
//         & > :nth-child(${({ $activeSlideIndex }) => $activeSlideIndex + 1}) {
//             visibility: visible;
//         }
//     }
// `;

const ActiveSlideContainer = styled.div<{ $aspectRatio: number }>`
    width: 100%;

    & > * {
        width: inherit;
        height: 100%;
        position: absolute;
        inset: 0;
        margin: auto;
        aspect-ratio: ${({ $aspectRatio }) => $aspectRatio};
    }
`;

const PresenterNoteContainer = styled.div<{ width: string }>`
    width: ${({ width }) => width};
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    background-color: #222222;
    color: white;
`;

type SlideShowFragmentProps = {
    mode: SlideShowMode;
    content: string;
    config?: string;
};

function SlideShowFragment(props: SlideShowFragmentProps) {
    const { mode, content, config } = props;

    const setSearchParam = useSetSearchParam();

    const dispatch = useAppDispatch();

    const isMobileDevice = useIsMobileDevice();
    const isWindowFocused = useIsWindowFocused();
    const windowSize = useWindowSize();

    const [totalPageCount, setTotalPageCount] = useState<number>(null);

    const activeSlideIndex = useActiveSlideIndex();

    const isPresenterMode = useMemo(() => {
        return mode === 'presenter';
    }, [mode]);

    useEffect(() => {
        const broadcastChannel =
            broadcastChannelManager.getChannel('slide_show_channel');

        function handleReceiveMessage(event: MessageEvent) {
            const { key, value } = event.data;
            switch (key) {
                case 'activeSlideIndex':
                    setSearchParam('page', value + 1);
                    return;
            }
        }

        if (!isWindowFocused) {
            broadcastChannel.addEventListener('message', handleReceiveMessage);
        }

        return () => {
            broadcastChannel.removeEventListener(
                'message',
                handleReceiveMessage
            );
        };
    }, [isWindowFocused, setSearchParam]);

    const wrapperCallbackRef = useCallback((node: HTMLDivElement) => {
        if (node) {
            node.focus();
        }
    }, []);

    const slideRatio = useSlideRatio(config);

    const {
        html,
        css,
        comments,
        refresh: refreshMarpRenderer,
    } = useDefaultMarpRender(config ?? '', content);

    useEffect(() => {
        const marpitContainerElem = document.createElement('div');
        marpitContainerElem.innerHTML = html;

        const slideShowContainer =
            marpitContainerElem.querySelectorAll('.marpit')[0];

        if (!slideShowContainer) {
            return;
        }

        const slides = slideShowContainer.children;
        setTotalPageCount(slides.length);

        // Create anchor ID and page map
        const anchorIdPageMap: Record<string, number> = {};
        for (let i = 0; i < slides.length; i++) {
            const slide = slides.item(i);

            const heading = slide.querySelector('h1, h2, h3, h4, h5, h6');
            if (!heading) {
                continue;
            }

            const anchorId = encodeURIComponent(heading.id);
            anchorIdPageMap[anchorId] = i + 1;
        }

        if (activeSlideIndex + 1 > slides.length) {
            return;
        }

        const activeSlideContainer = document.getElementById(
            'active-slide-container'
        );
        // Remove children of active slide container
        activeSlideContainer.innerHTML = '';

        // Change anchor href to page link
        const slide = slides.item(activeSlideIndex);
        const nextSlide = slides.item(activeSlideIndex + 1);

        slide.querySelectorAll('a').forEach((anchor) => {
            const hrefAttr = anchor.getAttribute('href');
            if (hrefAttr && hrefAttr.startsWith('#')) {
                anchor.removeAttribute('href');

                // Find target page number from anchor title
                const encodedTitle = encodeURIComponent(hrefAttr.substring(1));
                const targetPage = anchorIdPageMap[encodedTitle];

                if (targetPage && targetPage > 0) {
                    anchor.setAttribute(
                        'style',
                        `cursor: pointer;
                                color: #0969da;
                                background-color: transparent;
                                text-decoration: none;
                                :hover {
                                    text-decoration: underline;
                                }`
                    );

                    anchor.addEventListener('click', (event) => {
                        event.stopPropagation();
                        event.preventDefault();

                        setSearchParam('page', targetPage);
                    });
                }
            }
        });

        // Append active slide as a child of active slide container
        activeSlideContainer.appendChild(slide);
        refreshMarpRenderer();

        // Next slide for presenter mode
        if (isPresenterMode) {
            const nextSlideContainer = document.getElementById(
                'next-slide-container'
            );
            // Remove children of next slide container
            nextSlideContainer.innerHTML = '';

            // Append next slide as a child of next slide container
            if (nextSlide) {
                nextSlideContainer.appendChild(nextSlide);
            }
        }
    }, [
        isPresenterMode,
        html,
        refreshMarpRenderer,
        activeSlideIndex,
        setSearchParam,
    ]);

    const exitSlideShow = useCallback(() => {
        dispatch(setIsSlideShowMode(false));
    }, [dispatch]);

    const [
        moveToFirstSlide,
        moveToPrevSlide,
        moveToNextSlide,
        moveToLastSlide,
    ] = useMemo(() => {
        const moveToFirstSlide = () => {
            broadcastChannelManager
                .getChannel('slide_show_channel')
                .postMessage({
                    key: 'activeSlideIndex',
                    value: 0,
                });

            setSearchParam('page', 1);
        };

        const moveToPrevSlide = () => {
            let newSlideIndex = activeSlideIndex;
            if (activeSlideIndex - 1 >= 0) {
                newSlideIndex = activeSlideIndex - 1;
            }

            broadcastChannelManager
                .getChannel('slide_show_channel')
                .postMessage({
                    key: 'activeSlideIndex',
                    value: newSlideIndex,
                });

            setSearchParam('page', newSlideIndex + 1);
        };

        const moveToNextSlide = () => {
            let newSlideIndex = activeSlideIndex;
            if (activeSlideIndex + 1 < totalPageCount) {
                newSlideIndex = activeSlideIndex + 1;
            }

            broadcastChannelManager
                .getChannel('slide_show_channel')
                .postMessage({
                    key: 'activeSlideIndex',
                    value: newSlideIndex,
                });

            setSearchParam('page', newSlideIndex + 1);
        };

        const moveToLastSlide = () => {
            broadcastChannelManager
                .getChannel('slide_show_channel')
                .postMessage({
                    key: 'activeSlideIndex',
                    value: totalPageCount - 1,
                });

            setSearchParam('page', totalPageCount);
        };

        return [
            moveToFirstSlide,
            moveToPrevSlide,
            moveToNextSlide,
            moveToLastSlide,
        ];
    }, [totalPageCount, activeSlideIndex, setSearchParam]);

    const handleMouseDown = useCallback(
        (event: MouseEvent) => {
            const elem = event.target as HTMLElement;

            // Skip moving slide when anchor tag is clicked
            if (elem.tagName == 'A') {
                return;
            }

            if (event.clientX < windowSize.width / 2) {
                moveToPrevSlide();
            } else {
                moveToNextSlide();
            }
        },
        [windowSize, moveToPrevSlide, moveToNextSlide]
    );

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            switch (event.key) {
                case 'ArrowDown':
                case 'ArrowRight':
                    moveToNextSlide();
                    return;
                case 'ArrowUp':
                case 'ArrowLeft':
                    moveToPrevSlide();
                    return;
                case 'Escape':
                    exitSlideShow();
            }
        }

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [moveToPrevSlide, moveToNextSlide, exitSlideShow]);

    // if (!html || !css || !comments) {
    //     return null;
    // }

    return (
        <>
            <Wrapper
                ref={wrapperCallbackRef}
                onMouseDown={handleMouseDown}>
                {totalPageCount && (
                    <Box
                        position='absolute'
                        left='0'
                        top='0'
                        right='0'
                        zIndex='10'>
                        <Progress
                            size='md'
                            // colorScheme='primary'
                            // sx={{
                            //     '& > div:first-of-type': {
                            //         transitionProperty: 'width',
                            //         transitionDuration: 0.2,
                            //         transitionTimingFunction: 'ease-in-out',
                            //     },
                            // }}
                            value={Math.ceil(
                                ((activeSlideIndex + 1) / totalPageCount) * 100
                            )}
                        />
                    </Box>
                )}

                <Flex
                    position='absolute'
                    left='0'
                    top='7px'
                    right='0'
                    bottom='0'>
                    {css && <style>{css}</style>}

                    <Center
                        width={isPresenterMode ? '60%' : '100%'}
                        height='100%'
                        position='relative'
                        backgroundColor='#111111'>
                        <ActiveSlideContainer
                            id='active-slide-container'
                            $aspectRatio={slideRatio}
                            className='marpit'
                        />
                    </Center>

                    {isPresenterMode && (
                        <PresenterNoteContainer width='40%'>
                            <Box
                                id='next-slide-container'
                                padding='16px 16px 0px 16px'
                                className='marpit'
                            />

                            {comments && (
                                <Box
                                    flex='1'
                                    marginTop='16px'
                                    paddingLeft='16px'
                                    paddingRight='16px'
                                    overflowY='scroll'>
                                    {comments[activeSlideIndex].map(
                                        (comment, index) => {
                                            return (
                                                <Text
                                                    key={index}
                                                    fontSize='1.2rem'
                                                    lineHeight='2rem'
                                                    whiteSpace='pre-wrap'>
                                                    {comment}
                                                </Text>
                                            );
                                        }
                                    )}
                                </Box>
                            )}
                        </PresenterNoteContainer>
                    )}
                </Flex>

                {/* Bottom Menu */}
                {totalPageCount && (
                    <SlideShowBottomMenu
                        isPresenterMode={isPresenterMode}
                        exitSlideShow={exitSlideShow}
                        moveToFirstSlide={moveToFirstSlide}
                        moveToPrevSlide={moveToPrevSlide}
                        moveToNextSlide={moveToNextSlide}
                        moveToLastSlide={moveToLastSlide}
                        currentPageNo={activeSlideIndex + 1}
                        totalPageCount={totalPageCount}
                    />
                )}

                {/* Close Button */}
                {false && mode !== 'public' && !isPresenterMode && (
                    <Box
                        position='absolute'
                        top='16px'
                        right='16px'>
                        <IconButton
                            variant='solid'
                            size='lg'
                            // colorScheme='blackAlpha'
                            icon={
                                <XIcon
                                    fontSize='2rem'
                                    color='white'
                                />
                            }
                            aria-label='Exit slide show mode'
                            onClick={(event) => {
                                event.stopPropagation();

                                exitSlideShow();
                            }}
                        />
                    </Box>
                )}
            </Wrapper>

            {!isMobileDevice && (
                <SlideExplorerFragment
                    content={content}
                    config={config}
                />
            )}
        </>
    );
}

export default SlideShowFragment;
