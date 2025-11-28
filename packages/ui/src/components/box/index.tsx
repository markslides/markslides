import type { CSSProperties } from 'react';
import styled from 'styled-components';

export const Box = styled.div.attrs<CSSProperties>((props) => ({
    style: {
        ...props.style,
    },
}))``;
