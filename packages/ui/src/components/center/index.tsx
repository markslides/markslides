import type { CSSProperties } from 'react';
import styled from 'styled-components';

export const Center = styled.div.attrs<CSSProperties>((props) => ({
    style: {
        ...props,
    },
}))`
    display: flex;
    align-items: center;
    justify-content: center;
`;
