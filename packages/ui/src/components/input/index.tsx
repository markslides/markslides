import { InputHTMLAttributes } from 'react';
import styled, { type CSSProperties } from 'styled-components';
import { inlineRules } from '../../utils/rulesUtil';

export const Input = styled.input.attrs<
    InputHTMLAttributes<HTMLInputElement> & {
        _focus?: CSSProperties;
    }
>(({ _focus, ...others }) => ({
    style: {
        ...others,
    },
}))`
    &:focus {
        background-color: rgba(255, 255, 255, 0.1);
        * {
            ${({ _focus }) => _focus && inlineRules(_focus)};
        }
    }
`;
