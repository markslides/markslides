import { useCallback } from 'react';
import {
    fileOpen,
    // directoryOpen,
    fileSave,
    supported as isFileSystemAccessApiSupported,
} from 'browser-fs-access';
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
import {
    setCurrentFileHandle,
    setIsSlideShowMode,
} from '@/redux/slices/appSlice';
import { setSlideConfig } from '@/redux/slices/slideConfigSlice';
import {
    setTitle,
    setContentRequested,
    resetLocalSlice,
} from '@/redux/slices/localSlice';
import useDisclosure from '@/hooks/app/useDisclosure';
import useHandleSave from '@/hooks/app/useHandleSave';
import { useToast } from '@/components/ui/use-toast';
import slideConfigUtil from '@/lib/utils/slideConfigUtil';

function EditorMenuBar() {
    const { toast } = useToast();

    const dispatch = useAppDispatch();

    const slideConfigState = useAppSelector((state) => state.slideConfig);
    const markdownTitle = useAppSelector((state) => state.local.title);
    const markdownContent = useAppSelector((state) => state.local.content);

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
            const blob = await fileOpen({
                mimeTypes: ['text/markdown'],
                extensions: ['.md'],
            });

            const extensionIndex = blob.name.lastIndexOf('.md');
            const title = blob.name.substring(0, extensionIndex);

            const file = await new Response(blob).text();
            const parts = file.split('---\n').filter((part) => !!part);
            const [marpConfig, ...restParts] = parts;
            const loadedMarkdownContent = restParts.join('---\n');
            const loadedSlideConfigState =
                slideConfigUtil.generateSlideConfigStateFromMarpConfig(
                    marpConfig
                );

            dispatch(setSlideConfig(loadedSlideConfigState));
            dispatch(setTitle(title));
            dispatch(setContentRequested(loadedMarkdownContent));
        } catch (error) {
            console.log(error);
        }
    }, [dispatch]);

    const handleClickSave = useHandleSave();

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
