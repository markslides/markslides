import { ChevronRightIcon } from 'lucide-react';
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
    MenubarRightSlot,
} from '@markslides/ui/menu-bar';

function EditorMenuBar() {
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
                            New Slides<MenubarRightSlot>⌘⌥N</MenubarRightSlot>
                        </MenubarItem>
                        <MenubarItem>
                            Open...
                            <MenubarRightSlot>⌘O</MenubarRightSlot>
                        </MenubarItem>
                        <MenubarItem>
                            Save<MenubarRightSlot>⌘S</MenubarRightSlot>
                        </MenubarItem>
                        <MenubarItem>
                            Save As...<MenubarRightSlot>⌘⌥S</MenubarRightSlot>
                        </MenubarItem>

                        <MenubarSeparator />

                        <MenubarItem>Rename</MenubarItem>

                        <MenubarSeparator />

                        <MenubarItem>Share Setting</MenubarItem>
                        <MenubarItem>Publish Setting</MenubarItem>
                        <MenubarItem>Export as PDF</MenubarItem>

                        <MenubarSeparator />

                        <MenubarItem>Slide Setting</MenubarItem>
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
                            Undo
                            <MenubarRightSlot>⌘Z</MenubarRightSlot>
                        </MenubarItem>
                        <MenubarItem>
                            Redo
                            <MenubarRightSlot>⌘⇧Z</MenubarRightSlot>
                        </MenubarItem>
                    </MenubarContent>
                </MenubarPortal>
            </MenubarMenu>

            <MenubarMenu>
                <MenubarTrigger>View</MenubarTrigger>
                <MenubarPortal>
                    <MenubarContent
                        align='start'
                        sideOffset={5}
                        alignOffset={-3}>
                        <MenubarItem>► Slide Show</MenubarItem>
                    </MenubarContent>
                </MenubarPortal>
            </MenubarMenu>

            <MenubarMenu>
                <MenubarTrigger>Help</MenubarTrigger>
                <MenubarPortal>
                    <MenubarContent
                        align='start'
                        sideOffset={5}
                        alignOffset={-3}>
                        <MenubarItem>What is MarkSlides?</MenubarItem>
                        <MenubarItem>Markdown Syntax</MenubarItem>
                    </MenubarContent>
                </MenubarPortal>
            </MenubarMenu>
        </MenubarRoot>
    );
}

export default EditorMenuBar;
