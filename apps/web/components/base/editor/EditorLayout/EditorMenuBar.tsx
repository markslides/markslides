import { useCallback } from 'react';
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
import useAppSelector from '@/redux/hooks/useAppSelector';
import useAppDispatch from '@/redux/hooks/useAppDispatch';
import { setIsSlideShowMode } from '@/redux/slices/appSlice';
import { openDialog } from '@/redux/slices/dialogSlice';
import { resetLocalSlice } from '@/redux/slices/localSlice';
import useDisclosure from '@/hooks/app/useDisclosure';
import useHandleSave from '@/hooks/app/useHandleSave';

function EditorMenuBar() {
    const dispatch = useAppDispatch();

    const {
        isOpen: isOpenDeleteConfirmDialog,
        onOpen: openDeleteConfirmDialog,
        onClose: closeDeleteConfirmDialog,
    } = useDisclosure();

    const setNewSlideForLocalMode = useCallback(() => {
        dispatch(resetLocalSlice());
    }, [dispatch]);

    const handleClickNewSlide = useCallback(() => {
        openDeleteConfirmDialog();
    }, [openDeleteConfirmDialog, setNewSlideForLocalMode]);

    const handleClickOpenSlide = useCallback(async () => {
        dispatch(
            openDialog({
                key: 'OpenSlide',
            })
        );
    }, [dispatch]);

    const handleClickSave = useHandleSave();

    const handleClickSaveAs = useCallback(() => {
        dispatch(
            openDialog({
                key: 'SaveAs',
            })
        );
    }, [dispatch]);

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
                        <MenubarItem onClick={handleClickNewSlide}>
                            New Slides<MenubarRightSlot>⌘⌥N</MenubarRightSlot>
                        </MenubarItem>
                        <MenubarItem onClick={handleClickOpenSlide}>
                            Open...
                            <MenubarRightSlot>⌘O</MenubarRightSlot>
                        </MenubarItem>
                        <MenubarItem
                            onClick={() => {
                                handleClickSave();
                            }}>
                            Save<MenubarRightSlot>⌘S</MenubarRightSlot>
                        </MenubarItem>
                        <MenubarItem onClick={handleClickSaveAs}>
                            Save As...<MenubarRightSlot>⌘⌥S</MenubarRightSlot>
                        </MenubarItem>

                        <MenubarSeparator />

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
