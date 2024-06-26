import * as DialogPrimitive from '@radix-ui/react-dialog';
import styled, { keyframes } from 'styled-components';

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

export const DialogRoot = styled(DialogPrimitive.Root)``;

export const DialogTrigger = styled(DialogPrimitive.Trigger)``;

export const DialogPortal = styled(DialogPrimitive.Portal)``;

export const DialogOverlay = styled(DialogPrimitive.DialogOverlay)`
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    inset: 0;
    animation: ${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
`;

export const DialogContent = styled(DialogPrimitive.DialogContent)`
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
    max-width: 450px;
    max-height: 85vh;
    padding: 25px;
    animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
    &:focus {
        outline: none;
    }
`;

export const DialogTitle = styled(DialogPrimitive.DialogTitle)`
    margin: 0;
    font-weight: 500;
    color: black;
    font-size: 17px;
`;

export const DialogDescription = styled(DialogPrimitive.DialogDescription)`
    margin: 10px 0 20px;
    color: black;
    font-size: 15px;
    line-height: 1.5;
`;

export const DialogClose = styled(DialogPrimitive.Close)``;
