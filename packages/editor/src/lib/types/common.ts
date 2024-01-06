import type { SlideConfigState } from '@markslides/renderer';

export type SlideShowMode = 'audience' | 'presenter' | 'public';

export type SlideInfo = {
    title: string | undefined;
    currentSlideTitle: string | undefined;
    currentSlideNumber: number;
    totalSlideCount: number;
};

export type MarkSlidesFile = {
    slideConfig: SlideConfigState;
    markdownContent: string;
};
