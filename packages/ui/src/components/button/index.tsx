import type { CSSProperties } from 'react';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';
import { inlineRules } from '../../utils/rulesUtil';

const StyledButton = styled.button.attrs<
    ButtonHTMLAttributes<HTMLButtonElement> & { _hover?: CSSProperties }
>(({ _hover, ...others }) => ({
    style: {
        ...others,
    },
}))`
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
        * {
            ${({ _hover }) => _hover && inlineRules(_hover)};
        }
    }
`;

const TitleContainer = styled.text`
    margin-bottom: -2px;
    font-size: 14px;
    font-weight: 500;
    line-height: 1;
`;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: React.ReactElement;
    children: ReactNode;
    _hover?: CSSProperties;
}

export function Button(props: ButtonProps): React.ReactElement {
    const { icon, children, _hover, ...other } = props;

    return (
        <StyledButton
            type='button'
            _hover={_hover}
            {...other}>
            {icon && icon}
            <TitleContainer>{children}</TitleContainer>
        </StyledButton>
    );
}

Button.displayName = 'Button';
