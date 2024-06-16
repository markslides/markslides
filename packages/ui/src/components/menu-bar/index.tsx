import * as MenubarPrimitive from '@radix-ui/react-menubar';
import styled, { css } from 'styled-components';

export const MenubarRoot = styled(MenubarPrimitive.Root)`
    display: flex;
    background-color: white;
    padding: 4px;
    /* box-shadow: 0 2px 10px var(--black-a7); */
`;

export const MenubarTrigger = styled(MenubarPrimitive.MenubarTrigger)`
    all: unset;
    padding: 8px 12px;
    outline: none;
    user-select: none;
    font-weight: 500;
    line-height: 1;
    border-radius: 4px;
    color: black;
    font-size: 13px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2px;
    transition: background-color 0.1s ease-in-out;

    &[data-highlighted] {
        background-color: #00000033;
    }
    &[data-state='open'] {
        background-color: #00000033;
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
    position: relative;
    padding: 8px 8px;
    display: flex;
    align-items: center;
    color: black;
    font-size: 14px;
    line-height: 1;
    border-radius: 4px;
    user-select: none;
    transition: background-color 0.1s ease-in-out;

    .inset {
        padding-left: 20px;
    }

    &[data-state='open'] {
        background-color: #00000033;
        /* color: white; */
    }

    &[data-highlighted] {
        background-color: #00000033;
        /* color: white; */
    }

    &[data-disabled] {
        color: black;
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
    margin: 8px;
    background-color: #eeeeee;
`;

export const MenubarMenu = styled(MenubarPrimitive.MenubarMenu)``;
export const MenubarRadioGroup = styled(MenubarPrimitive.MenubarRadioGroup)``;
export const MenubarPortal = styled(MenubarPrimitive.MenubarPortal)``;
export const MenubarSub = styled(MenubarPrimitive.MenubarSub)``;

export const MenubarRightSlot = styled.div`
    margin-left: auto;
    padding-left: 20px;
    color: black;
    &[data-highlighted] {
        color: white;
    }
    &[data-disabled] {
        color: gray;
    }
`;
