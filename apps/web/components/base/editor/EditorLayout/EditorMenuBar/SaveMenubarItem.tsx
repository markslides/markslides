import { MenubarItem, MenubarRightSlot } from '@markslides/ui/menu-bar';
import useHandleSave from '@/hooks/app/useHandleSave';

function SaveMenubarItem({ t }: { t: (key: string) => string }) {
    const handleClickSave = useHandleSave();

    return (
        <MenubarItem
            onClick={() => {
                handleClickSave();
            }}>
            {t('save')}<MenubarRightSlot>⌘S</MenubarRightSlot>
        </MenubarItem>
    );
}

export default SaveMenubarItem;
