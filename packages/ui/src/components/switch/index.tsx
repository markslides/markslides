import * as SwitchPrimitive from '@radix-ui/react-switch';
import styled, { type CSSProperties } from 'styled-components';

const SwitchRoot = styled(SwitchPrimitive.Root).attrs<CSSProperties>(
    (props) => ({
        style: {
            ...props,
        },
    })
)`
    width: 42px;
    height: 24px;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 9999px;
    position: relative;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    &:focus {
        box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
    }
    &[data-state='checked'] {
        background-color: black;
    }
`;

const SwitchThumb = styled(SwitchPrimitive.Thumb).attrs<CSSProperties>(
    (props) => ({
        style: {
            ...props,
        },
    })
)`
    display: block;
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 9999px;
    box-shadow: 0 2px 2px var(--black-a7);
    transition: transform 100ms;
    /* transform: translateX(2px); */
    will-change: transform;

    &[data-state='checked'] {
        transform: translateX(19px);
    }
`;

export interface SwitchProps extends SwitchPrimitive.SwitchProps {}

export function Switch(props: SwitchProps) {
    return (
        <SwitchRoot {...props}>
            <SwitchThumb />
        </SwitchRoot>
    );
}
