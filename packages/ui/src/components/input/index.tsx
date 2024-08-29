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
    all: unset;
    width: 100%;
    padding: 8px;
    color: black;
    font-size: 0.8rem;
    border: 0.5px solid #cccccc;
    border-radius: 4px;

    &:focus {
        background-color: rgba(255, 255, 255, 0.1);
        * {
            ${({ _focus }) => _focus && inlineRules(_focus)};
        }
    }
`;
