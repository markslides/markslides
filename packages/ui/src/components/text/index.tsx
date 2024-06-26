import styled, { type CSSProperties } from 'styled-components';

export const Text = styled.p.attrs<CSSProperties>((props) => ({
    style: {
        ...props,
    },
}))<CSSProperties>``;
