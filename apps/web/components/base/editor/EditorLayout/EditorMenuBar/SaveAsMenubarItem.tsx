import { MenubarItem, MenubarRightSlot } from '@markslides/ui/menu-bar';
import useHandleSaveAs from '@/hooks/app/useHandleSaveAs';

function SaveAsMenubarItem({ t }: { t: (key: string) => string }) {
    const handleSaveAs = useHandleSaveAs();

    return (
        <MenubarItem onClick={handleSaveAs}>
            {t('saveAs')}
            <MenubarRightSlot>⌘⌥S</MenubarRightSlot>
        </MenubarItem>
    );
}

export default SaveAsMenubarItem;
