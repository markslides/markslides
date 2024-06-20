import { DefaultTheme } from 'styled-components';
import colors from '@/theme/colors';

const myTheme: DefaultTheme = {
    colors: colors,
    layout: {
        maxWidth: '1280px',
    },
    breakpoint: {
        xs: '0px',
        sm: '600px',
        md: '960px',
        lg: '1280px',
        xl: '1920px',
    },
};

export default myTheme;
