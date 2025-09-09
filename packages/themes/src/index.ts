import defaultTheme from '@/generated/default';
import redTheme from '@/generated/red';
import greenTheme from '@/generated/green';
import blueTheme from '@/generated/blue';

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
        name: 'red',
        css: redTheme,
    },
    {
        name: 'green',
        css: greenTheme,
    },
    {
        name: 'blue',
        css: blueTheme,
    },
];

export default themes;
