import { MenubarItem, MenubarRightSlot } from '@markslides/ui/menu-bar';
import useHandleSaveAs from '@/hooks/app/useHandleSaveAs';

function SaveAsMenubarItem() {
    const handleSaveAs = useHandleSaveAs();

    return (
        <MenubarItem onClick={handleSaveAs}>
            Save As...<MenubarRightSlot>⌘⌥S</MenubarRightSlot>
        </MenubarItem>
    );
}

export default SaveAsMenubarItem;
