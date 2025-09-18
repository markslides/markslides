import type { SlideConfigState } from '@markslides/renderer';

export type SlideShowMode = 'audience' | 'presenter' | 'public';

export type SlideInfo = {
    slideTitle: string | undefined;
    currentPageTitle: string | undefined;
    currentPageNumber: number;
    totalPageCount: number;
};

export type CursorContext = {
    cursorPosition: number;
    lineNumber: number;
    selectionStr: string;
};

export type MarkSlidesFile = {
    slideConfig: SlideConfigState;
    markdownContent: string;
};
