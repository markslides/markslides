import { ButtonHTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
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
    icon?: JSX.Element;
    children: ReactNode;
}

export function Button(props: ButtonProps): JSX.Element {
    const { icon, children, ...other } = props;

    return (
        <StyledButton
            type='button'
            {...other}>
            {icon && icon}
            {children}
        </StyledButton>
    );
}

Button.displayName = 'Button';
