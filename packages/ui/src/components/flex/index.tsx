import type { CSSProperties } from 'react';
import styled from 'styled-components';

export const Flex = styled.div.attrs<CSSProperties>((props) => ({
    style: {
        ...props,
    },
}))`
    display: flex;
`;
