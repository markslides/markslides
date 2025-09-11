import defaultTheme from '@/generated/default';
import minimalTheme from '@/generated/minimal';

type MarkSlidesTheme = {
    name: string;
    css: string;
};

const themes: MarkSlidesTheme[] = [
    {
        name: 'default',
        css: defaultTheme,
    },
    {
        name: 'minimal',
        css: minimalTheme,
    },
];

export default themes;
