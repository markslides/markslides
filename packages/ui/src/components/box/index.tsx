import styled, { type CSSProperties } from 'styled-components';

export const Box = styled.div.attrs<CSSProperties>((props) => ({
    style: {
        ...props,
    },
}))<CSSProperties>``;
