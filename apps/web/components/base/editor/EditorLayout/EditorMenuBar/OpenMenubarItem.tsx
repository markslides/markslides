import { MenubarItem, MenubarRightSlot } from '@markslides/ui/menu-bar';
import useHandleOpen from '@/hooks/app/useHandleOpen';

function OpenMenubarItem() {
    const handleOpen = useHandleOpen();

    return (
        <MenubarItem onClick={handleOpen}>
            Open...
            <MenubarRightSlot>⌘O</MenubarRightSlot>
        </MenubarItem>
    );
}

export default OpenMenubarItem;
