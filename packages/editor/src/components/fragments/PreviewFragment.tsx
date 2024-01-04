'use client';

import { useRef, useEffect } from 'react';
import { EditorView } from '@codemirror/view';
import styled from 'styled-components';
import {
    useDefaultMarpRender,
    type SlideConfigState,
} from '@markslides/renderer';

const Wrapper = styled.div`
    height: 100%;
    background-color: #eeeeee;
`;

const MarpitContainer = styled.div<{ $currentSlideNum: number }>`
    height: 100%;
    .marpit {
        min-height: 100%;
        padding: 32px;
        display: flex;
        flex-direction: column;
        gap: 32px;
        background-color: #eeeeee;
        font-family: 'Noto Sans KR', sans-serif;

        & > * {
            box-shadow: 0 0 4px 8px transparent;
            /* border-width: 8px;
            border-style: solid;
            border-color: transparent;
            transition: border-color 0.2s ease-in-out; */
            transition: box-shadow 0.2s ease-in-out;
        }
        & > :nth-child(${({ $currentSlideNum }) => $currentSlideNum}) {
            box-shadow: 0 0 4px 8px #d292ff;
        }
    }
`;

type PreviewFragmentProps = {
    config: SlideConfigState;
    content: string;
    currentCursorPosition: number;
    currentSlideNum: number;
    onClickSlide: (slide: Element, index: number) => void;
};

function PreviewFragment(props: PreviewFragmentProps) {
    const {
        config,
        content,
        currentCursorPosition,
        currentSlideNum,
        onClickSlide,
    } = props;

    const { html, css, comments } = useDefaultMarpRender(config, content);

    const wrapperRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (wrapperRef.current) {
            const marpitElem = wrapperRef.current.querySelector('.marpit');
            if (marpitElem) {
                // Add click event listener for each slide
                for (let i = 0; i < marpitElem.children.length; i++) {
                    const slide = marpitElem.children.item(i);
                    if (slide) {
                        slide.addEventListener('click', () => {
                            onClickSlide(slide, i);
                        });
                    }
                }

                const currentSlideElem =
                    marpitElem.children[currentSlideNum - 1];
                if (currentSlideElem) {
                    currentSlideElem.scrollIntoView({
                        block: 'center',
                        inline: 'center',
                        behavior: 'smooth',
                    });
                }
            }
        }
    }, [currentCursorPosition, currentSlideNum]);

    if (!html) {
        return <Wrapper />;
    }

    return (
        <Wrapper ref={wrapperRef}>
            <style>{css}</style>
            <MarpitContainer
                $currentSlideNum={currentSlideNum}
                dangerouslySetInnerHTML={{
                    __html: html,
                }}
            />
        </Wrapper>
    );
}

export default PreviewFragment;
