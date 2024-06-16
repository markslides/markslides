import { ButtonHTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    padding: 8px;
    font-size: 1rem;
`;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

export function Button(props: ButtonProps): JSX.Element {
    const { children, ...other } = props;

    return (
        <StyledButton
            type='button'
            {...other}>
            {children}
        </StyledButton>
    );
}

Button.displayName = 'Button';
