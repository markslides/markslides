import type { CSSProperties } from 'react';
import styled from 'styled-components';

export const Text = styled.p.attrs<CSSProperties>((props) => ({
    style: {
        ...props,
    },
}))``;
