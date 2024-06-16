import styled, { type CSSProperties } from 'styled-components';

export const Flex = styled.div.attrs<CSSProperties>((props) => ({
    style: {
        ...props,
    },
}))<CSSProperties>`
    display: flex;
`;
