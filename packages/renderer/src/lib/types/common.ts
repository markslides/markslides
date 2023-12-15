import slideConfigConst from '@//lib/constants/slideConfigConst';

export type SlideTheme = (typeof slideConfigConst.themes)[number];
export type SlideClass = (typeof slideConfigConst.classes)[number]['value'];
export type SlideSize = (typeof slideConfigConst.sizes)[number];

export interface SlideConfigState {
    header: string;
    footer: string;
    paginate: boolean;
    theme: SlideTheme;
    class: SlideClass;
    size: SlideSize;
}

export type SlideShowMode = 'audience' | 'presenter' | 'public';

export type MarkSlidesFile = {
    slideConfig: SlideConfigState;
    markdownContent: string;
};
