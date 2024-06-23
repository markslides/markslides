import { useCallback } from 'react';
import {
    fileSave,
    supported as isFileSystemAccessApiSupported,
} from 'browser-fs-access';
import { MenubarItem, MenubarRightSlot } from '@markslides/ui/menu-bar';
import useAppSelector from '@/redux/hooks/useAppSelector';
import useAppDispatch from '@/redux/hooks/useAppDispatch';
import { setCurrentFileHandle } from '@/redux/slices/appSlice';
import { useToast } from '@/components/ui/use-toast';
import slideConfigUtil from '@/lib/utils/slideConfigUtil';

function SaveAsMenubarItem() {
    const { toast } = useToast();

    const dispatch = useAppDispatch();

    const slideConfigState = useAppSelector((state) => state.slideConfig);
    const markdownTitle = useAppSelector((state) => state.local.title);
    const markdownContent = useAppSelector((state) => state.local.content);

    const handleClickSaveAs = useCallback(async () => {
        if (!isFileSystemAccessApiSupported) {
            toast({
                title: 'File System Access API is not supported on your computer.',
                // status: 'error',
                // position: 'top',
                duration: 3000,
            });
            return;
        }

        try {
            const slideConfig =
                slideConfigUtil.generateMarpConfigFromSlideConfigState(
                    slideConfigState
                );
            const file = `---\n${slideConfig}\n---\n\n${markdownContent}`;
            const blob = new Blob([file], {
                type: 'text/markdown',
            });

            const fileHandle = await fileSave(blob, {
                fileName: markdownTitle || 'Untitled',
                description: 'MarkSlides file',
                extensions: ['.md'],
            });

            dispatch(setCurrentFileHandle(fileHandle));
        } catch (error) {
            console.log(error);
        }
    }, [dispatch]);

    return (
        <MenubarItem onClick={handleClickSaveAs}>
            Save As...<MenubarRightSlot>⌘⌥S</MenubarRightSlot>
        </MenubarItem>
    );
}

export default SaveAsMenubarItem;
