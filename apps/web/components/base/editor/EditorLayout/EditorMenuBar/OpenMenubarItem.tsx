import { MenubarItem, MenubarRightSlot } from '@markslides/ui/menu-bar';
import useHandleOpen from '@/hooks/app/useHandleOpen';

function OpenMenubarItem({ t }: { t: (key: string) => string }) {
    const handleOpen = useHandleOpen();

    return (
        <MenubarItem onClick={handleOpen}>
            {t('open')}
            <MenubarRightSlot>⌘O</MenubarRightSlot>
        </MenubarItem>
    );
}

export default OpenMenubarItem;
