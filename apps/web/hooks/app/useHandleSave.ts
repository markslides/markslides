import { useCallback } from 'react';
import {
    fileOpen,
    // directoryOpen,
    fileSave,
    supported as isFileSystemAccessApiSupported,
} from 'browser-fs-access';
import type { SlideConfigState } from '@markslides/renderer';
import useAppSelector from '@/redux/hooks/useAppSelector';
import useAppDispatch from '@/redux/hooks/useAppDispatch';
import { useToast } from '@/components/ui/use-toast';
import slideConfigUtil from '@/lib/utils/slideConfigUtil';

function useHandleSave() {
    const { toast } = useToast();

    const currentFileHandle = useAppSelector(
        (state) => state.app.currentFileHandle
    );
    const slideConfigState = useAppSelector((state) => state.slideConfig);
    const markdownTitle = useAppSelector((state) => state.local.title);
    const markdownContent = useAppSelector((state) => state.local.content);
    const dispatch = useAppDispatch();

    const showFileSystemAccessApiNotSupportedToast = useCallback(() => {
        if (!isFileSystemAccessApiSupported) {
            toast({
                title: 'File System Access API is not supported on your computer.',
                // status: 'error',
                // position: 'top',
                duration: 3000,
            });
            return;
        }
    }, [toast]);

    return useCallback(
        async (newSlideConfigState?: SlideConfigState) => {
            const slideConfig =
                slideConfigUtil.generateMarpConfigFromSlideConfigState(
                    newSlideConfigState ?? slideConfigState
                );

            if (!isFileSystemAccessApiSupported) {
                showFileSystemAccessApiNotSupportedToast();
                return;
            }

            if (!currentFileHandle) {
                toast({
                    title: 'currentFile is not selected.',
                    description: 'Please try Save As...',
                    // status: 'error',
                    // position: 'top',
                    duration: 2000,
                });
                return;
            }

            const file = `---\n${slideConfig}\n---\n\n${markdownContent}`;
            const blob = new Blob([file], {
                type: 'text/markdown',
            });

            await fileSave(
                blob,
                {
                    fileName: markdownTitle || 'Untitled',
                    description: 'MarkSlides file',
                    extensions: ['.md'],
                },
                currentFileHandle
            );
        },
        [
            showFileSystemAccessApiNotSupportedToast,
            slideConfigState,
            markdownTitle,
            markdownContent,
            currentFileHandle,
            toast,
            dispatch,
        ]
    );
}

export default useHandleSave;
