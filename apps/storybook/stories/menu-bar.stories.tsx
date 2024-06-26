import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';
import { DotIcon, CheckIcon, ChevronRightIcon } from 'lucide-react';
import {
    MenubarRoot,
    MenubarMenu,
    MenubarTrigger,
    MenubarSubTrigger,
    MenubarPortal,
    MenubarContent,
    MenubarSubContent,
    MenubarItem,
    MenubarSub,
    MenubarSeparator,
    MenubarCheckboxItem,
    MenubarItemIndicator,
    MenubarRadioGroup,
    MenubarRadioItem,
} from '@markslides/ui/menu-bar';

const RightSlot = styled.div`
    margin-left: auto;
    padding-left: 20px;
    color: var(--mauve-9);
    [data-highlighted] {
        color: white;
    }
    [data-disabled] {
        color: var(--mauve-8);
    }
`;

const RADIO_ITEMS = ['Andy', 'Benoît', 'Luis'];
const CHECK_ITEMS = ['Always Show Bookmarks Bar', 'Always Show Full URLs'];

const SampleMenubar = () => {
    const [checkedSelection, setCheckedSelection] = useState([CHECK_ITEMS[1]]);
    const [radioSelection, setRadioSelection] = useState(RADIO_ITEMS[2]);

    return (
        <MenubarRoot>
            <MenubarMenu>
                <MenubarTrigger>File</MenubarTrigger>
                <MenubarPortal>
                    <MenubarContent
                        align='start'
                        sideOffset={5}
                        alignOffset={-3}>
                        <MenubarItem>
                            New Tab <RightSlot>⌘ T</RightSlot>
                        </MenubarItem>
                        <MenubarItem>
                            New Window <RightSlot>⌘ N</RightSlot>
                        </MenubarItem>
                        <MenubarItem disabled>New Incognito Window</MenubarItem>
                        <MenubarSeparator />
                        <MenubarSub>
                            <MenubarSubTrigger>
                                Share
                                <RightSlot>
                                    <ChevronRightIcon />
                                </RightSlot>
                            </MenubarSubTrigger>
                            <MenubarPortal>
                                <MenubarSubContent alignOffset={-5}>
                                    <MenubarItem>Email Link</MenubarItem>
                                    <MenubarItem>Messages</MenubarItem>
                                    <MenubarItem>Notes</MenubarItem>
                                </MenubarSubContent>
                            </MenubarPortal>
                        </MenubarSub>
                        <MenubarSeparator />
                        <MenubarItem>
                            Print… <RightSlot>⌘ P</RightSlot>
                        </MenubarItem>
                    </MenubarContent>
                </MenubarPortal>
            </MenubarMenu>

            <MenubarMenu>
                <MenubarTrigger>Edit</MenubarTrigger>
                <MenubarPortal>
                    <MenubarContent
                        align='start'
                        sideOffset={5}
                        alignOffset={-3}>
                        <MenubarItem>
                            Undo <RightSlot>⌘ Z</RightSlot>
                        </MenubarItem>
                        <MenubarItem>
                            Redo <RightSlot>⇧ ⌘ Z</RightSlot>
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarSub>
                            <MenubarSubTrigger>
                                Find
                                <RightSlot>
                                    <ChevronRightIcon />
                                </RightSlot>
                            </MenubarSubTrigger>

                            <MenubarPortal>
                                <MenubarSubContent alignOffset={-5}>
                                    <MenubarItem>Search the web…</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>Find…</MenubarItem>
                                    <MenubarItem>Find Next</MenubarItem>
                                    <MenubarItem>Find Previous</MenubarItem>
                                </MenubarSubContent>
                            </MenubarPortal>
                        </MenubarSub>
                        <MenubarSeparator />
                        <MenubarItem>Cut</MenubarItem>
                        <MenubarItem>Copy</MenubarItem>
                        <MenubarItem>Paste</MenubarItem>
                    </MenubarContent>
                </MenubarPortal>
            </MenubarMenu>

            <MenubarMenu>
                <MenubarTrigger>View</MenubarTrigger>
                <MenubarPortal>
                    <MenubarContent
                        align='start'
                        sideOffset={5}
                        alignOffset={-14}>
                        {CHECK_ITEMS.map((item) => (
                            <MenubarCheckboxItem
                                className='MenubarCheckboxItem inset'
                                key={item}
                                checked={checkedSelection.includes(item)}
                                onCheckedChange={() =>
                                    setCheckedSelection((current) =>
                                        current.includes(item)
                                            ? current.filter(
                                                  (el) => el !== item
                                              )
                                            : current.concat(item)
                                    )
                                }>
                                <MenubarItemIndicator>
                                    <CheckIcon />
                                </MenubarItemIndicator>
                                {item}
                            </MenubarCheckboxItem>
                        ))}
                        <MenubarSeparator />
                        <MenubarItem className='MenubarItem inset'>
                            Reload <RightSlot>⌘ R</RightSlot>
                        </MenubarItem>
                        <MenubarItem
                            className='MenubarItem inset'
                            disabled>
                            Force Reload <RightSlot>⇧ ⌘ R</RightSlot>
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem className='MenubarItem inset'>
                            Toggle Fullscreen
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem className='MenubarItem inset'>
                            Hide Sidebar
                        </MenubarItem>
                    </MenubarContent>
                </MenubarPortal>
            </MenubarMenu>

            <MenubarMenu>
                <MenubarTrigger>Profiles</MenubarTrigger>
                <MenubarPortal>
                    <MenubarContent
                        align='start'
                        sideOffset={5}
                        alignOffset={-14}>
                        <MenubarRadioGroup
                            value={radioSelection}
                            onValueChange={setRadioSelection}>
                            {RADIO_ITEMS.map((item) => (
                                <MenubarRadioItem
                                    className='MenubarRadioItem inset'
                                    key={item}
                                    value={item}>
                                    <MenubarItemIndicator>
                                        <DotIcon />
                                    </MenubarItemIndicator>
                                    {item}
                                </MenubarRadioItem>
                            ))}
                            <MenubarSeparator />
                            <MenubarItem className='MenubarItem inset'>
                                Edit…
                            </MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem className='MenubarItem inset'>
                                Add Profile…
                            </MenubarItem>
                        </MenubarRadioGroup>
                    </MenubarContent>
                </MenubarPortal>
            </MenubarMenu>
        </MenubarRoot>
    );
};

const meta: Meta = {
    component: SampleMenubar,
    argTypes: {},
};

export default meta;

type Story = StoryObj;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
    render: (props) => <SampleMenubar {...props} />,
    name: 'SampleMenubar',
    args: {},
};
