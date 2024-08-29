import * as SelectPrimitive from '@radix-ui/react-select';
import styled, { css } from 'styled-components';

export const SelectRoot = styled(SelectPrimitive.Root)``;

export const SelectTrigger = styled(SelectPrimitive.Trigger)`
    height: 32px;
    padding: 0 16px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    border-radius: 4px;
    color: black;
    font-size: 0.8rem;
    line-height: 1;
    background-color: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
    &:focus {
        box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
    }
    &[data-placeholder] {
        color: #cccccc;
    }
`;

export const SelectValue = styled(SelectPrimitive.Value)``;

export const SelectIcon = styled(SelectPrimitive.Icon)`
    color: black;
`;

export const SelectPortal = styled(SelectPrimitive.Portal)``;

export const SelectContent = styled(SelectPrimitive.Content)`
    overflow: hidden;
    background-color: white;
    border-radius: 6px;
    box-shadow:
        0px 10px 38px -10px rgba(22, 23, 24, 0.35),
        0px 10px 20px -15px rgba(22, 23, 24, 0.2);
`;

export const SelectViewport = styled(SelectPrimitive.Viewport)`
    padding: 5px;
`;

export const SelectGroup = styled(SelectPrimitive.Group)``;

export const SelectLabel = styled(SelectPrimitive.Label)`
    padding: 0 25px;
    font-size: 12px;
    line-height: 24px;
    color: black;
`;

export const SelectItem = styled(SelectPrimitive.Item)`
    font-size: 13px;
    line-height: 1;
    color: #777777;
    border-radius: 3px;
    display: flex;
    align-items: center;
    height: 25px;
    padding: 0 35px 0 25px;
    position: relative;
    user-select: none;
    transition: background-color 0.1s ease-in-out;

    &[data-disabled] {
        color: #777777;
        pointer-events: none;
    }
    &[data-highlighted] {
        outline: none;
        background-color: rgba(0, 0, 0, 0.1);
        color: black;
    }
`;

export const SelectItemText = styled(SelectPrimitive.ItemText)``;

export const SelectItemIndicator = styled(SelectPrimitive.ItemIndicator)`
    position: absolute;
    left: 0;
    width: 25px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
`;

const scrollButonStyle = css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 25px;
    background-color: white;
    color: black;
    cursor: default;
`;

export const SelectScrollUpButton = styled(SelectPrimitive.ScrollUpButton)`
    ${scrollButonStyle}
`;

export const SelectScrollDownButton = styled(SelectPrimitive.ScrollDownButton)`
    ${scrollButonStyle}
`;

export const SelectSeparator = styled(SelectPrimitive.Separator)`
    height: 1px;
    margin: 4px;
    background-color: #cccccc;
`;
