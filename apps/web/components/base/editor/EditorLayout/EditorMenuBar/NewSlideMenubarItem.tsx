import { useCallback } from 'react';
import { MenubarItem, MenubarRightSlot } from '@markslides/ui/menu-bar';
import useAppDispatch from '@/redux/hooks/useAppDispatch';
import { openDialog } from '@/redux/slices/dialogSlice';

function NewSlideMenubarItem({ t }: { t: (key: string) => string }) {
    const dispatch = useAppDispatch();

    const handleClickNewSlide = useCallback(() => {
        dispatch(
            openDialog({
                key: 'NewSlideConfirm',
            })
        );
    }, [dispatch]);

  return (
    <MenubarItem onClick={handleClickNewSlide}>
      {t('create')}
      <MenubarRightSlot>⌘⌥N</MenubarRightSlot>
    </MenubarItem>
  );
}

export default NewSlideMenubarItem;
