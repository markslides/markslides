import { useCallback } from 'react';
import { MenubarItem, MenubarRightSlot } from '@markslides/ui/menu-bar';
import useAppDispatch from '@/redux/hooks/useAppDispatch';
import { resetLocalSlice } from '@/redux/slices/localSlice';
import useDisclosure from '@/hooks/app/useDisclosure';

function NewSlideMenubarItem() {
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

    return (
        <MenubarItem onClick={handleClickNewSlide}>
            New Slides<MenubarRightSlot>⌘⌥N</MenubarRightSlot>
        </MenubarItem>
    );
}

export default NewSlideMenubarItem;
