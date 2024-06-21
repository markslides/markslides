import { ButtonHTMLAttributes } from 'react';
import styled, { type CSSProperties } from 'styled-components';

function inlineRules(rulesObj: CSSProperties) {
    return Object.entries(rulesObj)
        .map(([property, value]) => `${property}: ${value};`)
        .join('');
}

const Wrapper = styled.button.attrs<
    ButtonHTMLAttributes<HTMLButtonElement> & { _hover?: CSSProperties }
>(({ _hover, ...others }) => ({
    style: {
        ...others,
    },
}))`
    all: unset;
    padding: 8px;
    cursor: pointer;
    background-color: transparent;
    border-radius: 4px;
    transition: background-color 0.1s ease-in-out;

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
        * {
            ${({ _hover }) => _hover && inlineRules(_hover)};
        }
    }
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
