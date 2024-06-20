import { useEffect, useRef, memo } from 'react';
import styled from 'styled-components';
import { useDefaultMarpRender } from '@markslides/renderer';
import { SlideTransition } from '@markslides/ui/transitions';
import useSetSearchParam from '@/hooks/router/useSetSearchParam';
import useDisclosure from '@/hooks/app/useDisclosure';
import useActiveSlideIndex from '@/hooks/app/useActiveSlideIndex';
import broadcastChannelManager from '@/lib/managers/broadcastChannelManager';
import { hideScrollBarMixin } from '@/theme/mixins';

const Wrapper = styled.div`
    width: 10vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    /* background-color: red; */
    ${hideScrollBarMixin}
`;

const SlidesContainer = styled.div<{ $activeSlideIndex: number }>`
    width: 160px;
    padding: 8px;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    overflow-y: scroll;
    background-color: white;
    box-shadow: 0 0 2px 2px #999999;

    .marpit {
        & > * {
            margin-top: 8px;
            border: 0.5px solid #999999;
            box-shadow: 0 0 4px 4px transparent;
            transition: box-shadow 0.2s ease-in-out;
            cursor: pointer;
        }
        & > :nth-child(${({ $activeSlideIndex }) => $activeSlideIndex + 1}) {
            box-shadow: 0 0 4px 4px #ad00ff;
        }
    }
`;

interface SlideExplorerFragmentProps {
    content: string;
    config?: string;
}

function SlideExplorerFragment(props: SlideExplorerFragmentProps) {
    const { content, config } = props;

    const setSearchParam = useSetSearchParam();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const activeSlideIndex = useActiveSlideIndex();

    const {
        html,
        css,
        comments,
        refresh: refreshMarpRenderer,
    } = useDefaultMarpRender(config ?? '', content);

    const timerRef = useRef(null);

    useEffect(() => {
        const slideExplorerContainer = document.getElementById(
            'slide-explorer-container'
        );
        slideExplorerContainer.innerHTML = html;

        const slidesContainer =
            slideExplorerContainer.querySelectorAll('.marpit')[0];

        if (!slidesContainer) {
            return;
        }

        const slides = slidesContainer.children;

        for (let i = 0; i < slides.length; i++) {
            const slide = slides.item(i);

            // Remove preload, autoplay attributes from video elements
            const videoElems = slide.querySelectorAll('video');
            const iterator = videoElems.values();
            while (true) {
                const current = iterator.next();
                if (current.done) {
                    break;
                }

                const videoElem = current.value as HTMLVideoElement;
                videoElem.removeAttribute('preload');
                videoElem.removeAttribute('autoplay');
            }

            slide.addEventListener('click', (event) => {
                event.stopPropagation();
                event.preventDefault();

                broadcastChannelManager
                    .getChannel('slide_show_channel')
                    .postMessage({
                        key: 'activeSlideIndex',
                        value: i,
                    });

                setSearchParam('page', i + 1);
            });
        }
    }, [html, activeSlideIndex, setSearchParam]);

    return (
        <Wrapper
            onMouseEnter={() => {
                timerRef.current = setTimeout(onOpen, 200);
            }}
            onMouseLeave={() => {
                if (timerRef.current) {
                    clearTimeout(timerRef.current);
                }
                onClose();
            }}
            onClick={onClose}>
            {css && <style>{css}</style>}

            <SlideTransition
                direction='left'
                isOpen={isOpen}
                style={{ zIndex: 1000 }}>
                <SlidesContainer
                    id='slide-explorer-container'
                    $activeSlideIndex={activeSlideIndex}
                    onMouseLeave={() => {
                        if (timerRef.current) {
                            clearTimeout(timerRef.current);
                        }
                        onClose();
                    }}
                />
            </SlideTransition>
        </Wrapper>
    );
}

export default memo(SlideExplorerFragment);
