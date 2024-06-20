import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

export const Wrapper = styled.button.attrs<
    ButtonHTMLAttributes<HTMLButtonElement>
>((props) => ({
    style: {
        ...props,
    },
}))<ButtonHTMLAttributes<HTMLButtonElement>>`
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

    :hover {
        background-color: #999999;
    }
`;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon: JSX.Element;
    size: 'xs' | 'sm' | 'lg' | 'xl';
    variant: 'solid' | 'outline';
}

export function IconButton(props: ButtonProps): JSX.Element {
    // TODO: Apply size, variant prop to button style
    const { icon, size, variant, ...other } = props;

    return <Wrapper {...other}>{icon && icon}</Wrapper>;
}

Wrapper.displayName = 'IconButton';
