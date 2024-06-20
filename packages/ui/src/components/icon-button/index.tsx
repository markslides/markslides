import { ButtonHTMLAttributes } from 'react';
import styled, { CSSProperties } from 'styled-components';

export const Wrapper = styled.button.attrs<
    ButtonHTMLAttributes<HTMLButtonElement>
>((props) => ({
    style: {
        ...props,
    },
}))<ButtonHTMLAttributes<HTMLButtonElement> & { _hover?: CSSProperties }>`
    all: unset;
    height: min-content;
    padding: 8px 16px;
    font-size: 14px;
    line-height: 1;
    color: black;
    cursor: pointer;
    background-color: #eeeeee;
    border-radius: 4px;
    transition: background-color 0.1s ease-in-out;

    ${({ _hover }) =>
        _hover &&
        `
        :hover {
            ${_hover}
        }
    `}
`;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon: JSX.Element;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    variant: 'solid' | 'outline' | 'unstyled';
    isDisabled?: boolean;
    _hover?: CSSProperties;
}

export function IconButton(props: ButtonProps): JSX.Element {
    // TODO: Apply size, variant prop to button style
    const { icon, size = 'md', variant, isDisabled, _hover, ...other } = props;

    return (
        <Wrapper
            disabled={isDisabled}
            aria-disabled={isDisabled}
            _hover={_hover}
            {...other}>
            {icon && icon}
        </Wrapper>
    );
}

Wrapper.displayName = 'IconButton';
