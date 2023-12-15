import type { SlideConfigState } from '@markslides/renderer';

export type SlideShowMode = 'audience' | 'presenter' | 'public';

export type MarkSlidesFile = {
    slideConfig: SlideConfigState;
    markdownContent: string;
};
