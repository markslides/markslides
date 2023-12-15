import themes from '@//lib/marp/themes';

const slideConfigConst = {
    // themes: ['default', 'gaia', 'uncover'] as const,
    themes: ['default', ...themes.map((theme) => theme.name)] as const,
    // classes: ['normal', 'invert', 'lead'] as const,
    classes: [
        { label: 'light', value: 'normal' },
        { label: 'dark', value: 'invert' },
    ] as const,
    sizes: ['4:3', '16:9'] as const,
};

export default slideConfigConst;
