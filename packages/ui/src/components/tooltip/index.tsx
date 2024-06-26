import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { PropsWithChildren } from 'react';
import styled, { keyframes } from 'styled-components';

const slideUpAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateY(2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideRightAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateX(-2px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideDownAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateY(-2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideLeftAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateX(2px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const TooltipProvider = styled(TooltipPrimitive.Provider)`
    all: unset;
`;

const TooltipRoot = styled(TooltipPrimitive.Root)``;

const TooltipTrigger = styled(TooltipPrimitive.Trigger)``;

const TooltipPortal = styled(TooltipPrimitive.Portal)``;

const TooltipContent = styled(TooltipPrimitive.Content)`
    border-radius: 4px;
    padding: 8px 12px;
    font-size: 0.8rem;
    line-height: 1;
    color: white;
    background-color: rgba(0, 0, 0, 0.6);
    box-shadow:
        hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
        hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
    user-select: none;
    animation-duration: 400ms;
    animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform, opacity;

    &[data-state='delayed-open'][data-side='top'] {
        animation-name: ${slideDownAndFade};
    }
    &[data-state='delayed-open'][data-side='right'] {
        animation-name: ${slideLeftAndFade};
    }
    &[data-state='delayed-open'][data-side='bottom'] {
        animation-name: ${slideUpAndFade};
    }
    &[data-state='delayed-open'][data-side='left'] {
        animation-name: ${slideRightAndFade};
    }
`;

const TooltipArrow = styled(TooltipPrimitive.Arrow)`
    fill: rgba(0, 0, 0, 0.6);
`;

interface TooltipProps extends PropsWithChildren {
    hasArrow: boolean;
    placement: 'left' | 'top' | 'right' | 'bottom';
    label: string;
}

export function Tooltip(props: TooltipProps) {
    const { hasArrow, placement, label, children } = props;

    return (
        <TooltipProvider>
            <TooltipRoot>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipPortal>
                    <TooltipContent
                        side={placement}
                        sideOffset={5}>
                        {label}
                        {hasArrow && <TooltipArrow />}
                    </TooltipContent>
                </TooltipPortal>
            </TooltipRoot>
        </TooltipProvider>
    );
}
