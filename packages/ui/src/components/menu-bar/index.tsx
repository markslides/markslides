import * as MenubarPrimitive from '@radix-ui/react-menubar';
import styled, { css } from 'styled-components';

export const MenubarRoot = styled(MenubarPrimitive.Root)`
    display: flex;
    background-color: white;
    padding: 3px;
    border-radius: 6px;
    box-shadow: 0 2px 10px var(--black-a7);
`;

export const MenubarTrigger = styled(MenubarPrimitive.MenubarTrigger)`
    all: unset;
    padding: 8px 12px;
    outline: none;
    user-select: none;
    font-weight: 500;
    line-height: 1;
    border-radius: 4px;
    color: var(--violet-11);
    font-size: 13px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2px;

    [data-highlighted] {
        background-color: var(--violet-4);
    }
    [data-state='open'] {
        background-color: var(--violet-4);
    }
`;

export const contentStyle = css`
    min-width: 220px;
    background-color: white;
    border-radius: 6px;
    padding: 5px;
    box-shadow:
        0px 10px 38px -10px rgba(22, 23, 24, 0.35),
        0px 10px 20px -15px rgba(22, 23, 24, 0.2);
    animation-duration: 400ms;
    animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform, opacity;
`;

export const MenubarContent = styled(MenubarPrimitive.MenubarContent)`
    ${contentStyle}
`;
export const MenubarSubContent = styled(MenubarPrimitive.MenubarSubContent)`
    ${contentStyle}
`;

export const itemStyles = css`
    all: unset;
    font-size: 13px;
    line-height: 1;
    color: var(--violet-11);
    border-radius: 4px;
    display: flex;
    align-items: center;
    height: 25px;
    padding: 0 10px;
    position: relative;
    user-select: none;

    .inset {
        padding-left: 20px;
    }

    [data-state='open'] {
        background-color: var(--violet-4);
        color: var(--violet-11);
    }

    [data-highlighted] {
        background-image: linear-gradient(
            135deg,
            var(--violet-9) 0%,
            var(--violet-10) 100%
        );
        color: var(--violet-1);
    }

    [data-disabled] {
        color: var(--mauve-8);
        pointer-events: none;
    }
`;

export const MenubarItem = styled(MenubarPrimitive.Item)`
    ${itemStyles}
`;
export const MenubarSubTrigger = styled(MenubarPrimitive.SubTrigger)`
    ${itemStyles}
`;
export const MenubarCheckboxItem = styled(MenubarPrimitive.CheckboxItem)`
    ${itemStyles}
`;
export const MenubarRadioItem = styled(MenubarPrimitive.RadioItem)`
    ${itemStyles}
`;

export const MenubarItemIndicator = styled(
    MenubarPrimitive.MenubarItemIndicator
)`
    position: absolute;
    left: 0;
    width: 20px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
`;

export const MenubarSeparator = styled(MenubarPrimitive.MenubarSeparator)`
    height: 1px;
    background-color: var(--violet-6);
    margin: 5px;
`;

export const MenubarMenu = styled(MenubarPrimitive.MenubarMenu)``;
export const MenubarRadioGroup = styled(MenubarPrimitive.MenubarRadioGroup)``;
export const MenubarPortal = styled(MenubarPrimitive.MenubarPortal)``;
export const MenubarSub = styled(MenubarPrimitive.MenubarSub)``;
