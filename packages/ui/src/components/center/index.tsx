import styled, { type CSSProperties } from 'styled-components';

export const Center = styled.div.attrs<CSSProperties>((props) => ({
    style: {
        ...props,
    },
}))<CSSProperties>`
    display: flex;
    align-items: center;
    justify-content: center;
`;
