'use client';

import { useRef, useEffect, useCallback, memo, MouseEvent } from 'react';
import styled from 'styled-components';
import {
    useDefaultMarpRender,
    type SlideConfigState,
} from '@markslides/renderer';

function findMarpitSvgElement(element: HTMLElement) {
    let currentElement = element;

    while (currentElement !== null) {
        if (
            currentElement.tagName === 'svg' &&
            currentElement.getAttribute('data-marpit-svg') !== null
        ) {
            return currentElement;
        }

        if (!currentElement.parentElement) {
            break;
        }
        currentElement = currentElement.parentElement;
    }

    return null;
}

function getIndexOfChildElement(parentElement: Element, childElement: Element) {
    const children = parentElement.children;
    let index;

    for (index = 0; index < children.length; index++) {
        if (children[index] === childElement) {
            break;
        }
    }
    return index;
}

const Wrapper = styled.div`
    min-height: 100%;
    height: max-content;
    padding: 32px;
    background-color: #eeeeee;
`;

const MarpitContainer = styled.div<{ $currentSlideNum: number }>`
    height: 100%;

    .marpit {
        min-height: 100%;
        display: flex;
        flex-direction: column;
        gap: 32px;
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
    isSyncCurrentPage?: boolean;
    currentLineNumber: number;
    currentSlideNumber: number;
    onClickSlide: (slide: HTMLElement, index: number) => void;
};

function PreviewFragment(props: PreviewFragmentProps) {
    const {
        config,
        content,
        isSyncCurrentPage = true,
        currentLineNumber,
        currentSlideNumber,
        onClickSlide,
    } = props;

    const { html, css, comments, refresh } = useDefaultMarpRender(
        config,
        content
    );

    const wrapperRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!isSyncCurrentPage) {
            return;
        }

        if (wrapperRef.current) {
            const marpitElem = wrapperRef.current.querySelector('.marpit');
            if (marpitElem) {
                const currentSlideElem =
                    marpitElem.children[currentSlideNumber - 1];
                if (currentSlideElem) {
                    setTimeout(() => {
                        currentSlideElem.scrollIntoView({
                            block: 'center',
                            inline: 'center',
                            behavior: 'smooth',
                        });
                    }, 100);
                }
            }
        }
    }, [isSyncCurrentPage, currentLineNumber, currentSlideNumber]);

    const handleClickMarpitContainer = useCallback(
        (event: MouseEvent) => {
            const sectionElem = findMarpitSvgElement(
                event.target as HTMLElement
            );
            if (sectionElem && sectionElem.parentElement) {
                const pageIndex = getIndexOfChildElement(
                    sectionElem.parentElement,
                    sectionElem
                );

                onClickSlide(sectionElem, pageIndex);
            }
        },
        [onClickSlide]
    );

    if (!html) {
        return <Wrapper />;
    }

    return (
        <Wrapper ref={wrapperRef}>
            <style>{css}</style>
            <MarpitContainer
                $currentSlideNum={currentSlideNumber}
                dangerouslySetInnerHTML={{
                    __html: html,
                }}
                onClick={handleClickMarpitContainer}
            />
        </Wrapper>
    );
}

export default memo(PreviewFragment);
