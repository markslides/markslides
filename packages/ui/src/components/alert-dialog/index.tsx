import { type PropsWithChildren } from 'react';
import styled, { keyframes } from 'styled-components';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import '@/colors/primary.css';

const overlayShow = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const contentShow = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

export const AlertDialogRoot = styled(AlertDialogPrimitive.Root)``;

export const AlertDialogTrigger = styled(AlertDialogPrimitive.Trigger)``;

const AlertDialogOverlay = styled(AlertDialogPrimitive.Overlay)`
    background-color: var(--primary-1);
    position: fixed;
    inset: 0;
    animation: ${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
`;

const AlertDialogContent = styled(AlertDialogPrimitive.Content)`
    background-color: white;
    border-radius: 6px;
    box-shadow:
        hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
        hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    max-width: 500px;
    max-height: 85vh;
    padding: 25px;
    animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);

    :focus {
        outline: none;
    }
`;

export const AlertDialogTitle = styled(AlertDialogPrimitive.Title)`
    margin: 0;
    color: var(--primary-1);
    font-size: 17px;
    font-weight: 500;
`;

export const AlertDialogDescription = styled(AlertDialogPrimitive.Description)`
    margin-bottom: 20px;
    color: var(--primary-1);
    font-size: 15px;
    line-height: 1.5;
`;

export const AlertDialogCancel = styled(AlertDialogPrimitive.Cancel)``;

export const AlertDialogAction = styled(AlertDialogPrimitive.Action)``;

export function AlertDialogPortal(props: PropsWithChildren) {
    return (
        <AlertDialogPrimitive.Portal>
            <AlertDialogOverlay />

            <AlertDialogContent>{props.children}</AlertDialogContent>
        </AlertDialogPrimitive.Portal>
    );
}
