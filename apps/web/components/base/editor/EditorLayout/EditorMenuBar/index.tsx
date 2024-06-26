import { useCallback } from 'react';
import {
    MenubarRoot,
    MenubarMenu,
    MenubarTrigger,
    // MenubarSubTrigger,
    MenubarPortal,
    MenubarContent,
    // MenubarSubContent,
    MenubarItem,
    // MenubarSub,
    MenubarSeparator,
    // MenubarCheckboxItem,
    // MenubarItemIndicator,
    // MenubarRadioGroup,
    // MenubarRadioItem,
    MenubarRightSlot,
} from '@markslides/ui/menu-bar';
import useAppDispatch from '@/redux/hooks/useAppDispatch';
import { setIsSlideShowMode } from '@/redux/slices/appSlice';
import { openDialog } from '@/redux/slices/dialogSlice';
import NewSlideMenubarItem from '@/components/base/editor/EditorLayout/EditorMenuBar/NewSlideMenubarItem';
import OpenMenubarItem from '@/components/base/editor/EditorLayout/EditorMenuBar/OpenMenubarItem';
import SaveMenubarItem from '@/components/base/editor/EditorLayout/EditorMenuBar/SaveMenubarItem';
import SaveAsMenubarItem from '@/components/base/editor/EditorLayout/EditorMenuBar/SaveAsMenubarItem';
import appConst from '@/lib/constants/appConst';

function EditorMenuBar() {
    const dispatch = useAppDispatch();

    const handleClickSlideSetting = useCallback(() => {
        dispatch(
            openDialog({
                key: 'SlideSetting',
            })
        );
    }, [dispatch]);

    const handleClickUndoButton = useCallback(() => {
        const undoButton = document.querySelector<HTMLButtonElement>(
            `#${appConst.EDITOR_TOOLBAR_ID} > button:nth-child(1)`
        );

        if (undoButton) {
            undoButton.click();
        }
    }, []);

    const handleClickRedoButton = useCallback(() => {
        const redoButton = document.querySelector<HTMLButtonElement>(
            `#${appConst.EDITOR_TOOLBAR_ID} > button:nth-child(2)`
        );

        if (redoButton) {
            redoButton.click();
        }
    }, []);

    const handleClickSlideShow = useCallback(() => {
        dispatch(setIsSlideShowMode(true));
    }, [dispatch]);

    return (
        <MenubarRoot>
            <MenubarMenu>
                <MenubarTrigger>File</MenubarTrigger>
                <MenubarPortal>
                    <MenubarContent
                        align='start'
                        sideOffset={5}
                        alignOffset={-3}>
                        <NewSlideMenubarItem />
                        <OpenMenubarItem />
                        <SaveMenubarItem />
                        <SaveAsMenubarItem />

                        <MenubarSeparator />

                        <MenubarItem>Export as PDF</MenubarItem>

                        <MenubarSeparator />

                        <MenubarItem onClick={handleClickSlideSetting}>
                            Slide Setting
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
                        <MenubarItem onClick={handleClickUndoButton}>
                            Undo
                            <MenubarRightSlot>⌘Z</MenubarRightSlot>
                        </MenubarItem>
                        <MenubarItem onClick={handleClickRedoButton}>
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
                        <MenubarItem onClick={handleClickSlideShow}>
                            ► Slide Show
                        </MenubarItem>
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
