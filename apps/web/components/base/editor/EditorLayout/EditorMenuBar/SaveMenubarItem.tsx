import { MenubarItem, MenubarRightSlot } from '@markslides/ui/menu-bar';
import useHandleSave from '@/hooks/app/useHandleSave';

function SaveMenubarItem() {
    const handleClickSave = useHandleSave();

    return (
        <MenubarItem
            onClick={() => {
                handleClickSave();
            }}>
            Save<MenubarRightSlot>⌘S</MenubarRightSlot>
        </MenubarItem>
    );
}

export default SaveMenubarItem;
