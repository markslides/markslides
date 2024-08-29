import { css } from 'styled-components';

// Hide scrollbar
export const hideScrollBarMixin = css`
    /* Chrome, Safari and Opera */
    ::-webkit-scrollbar {
        display: none;
    }
    /* IE and Edge */
    -ms-overflow-style: none;
    /* Firefox */
    scrollbar-width: none;
`;
