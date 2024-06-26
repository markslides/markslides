import { ButtonHTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    all: unset;
    height: min-content;
    padding: 10px 16px;
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    color: black;
    background-color: #eeeeee;
    border-radius: 4px;
    transition: background-color 0.1s ease-in-out;

    &:hover {
        background-color: #cccccc;
    }
`;

const TitleContainer = styled.text`
    margin-bottom: -2px;
    font-size: 14px;
    font-weight: 500;
    line-height: 1;
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
            <TitleContainer>{children}</TitleContainer>
        </StyledButton>
    );
}

Button.displayName = 'Button';
