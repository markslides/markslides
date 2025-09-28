import { useCallback } from 'react';
import {
    fileOpen,
    supported as isFileSystemAccessApiSupported,
} from 'browser-fs-access';
import { slideConfigUtil } from '@markslides/renderer';
import useAppDispatch from '@/redux/hooks/useAppDispatch';
import { setSlideConfig } from '@/redux/slices/slideConfigSlice';
import { setTitle, setContentRequested } from '@/redux/slices/localSlice';
import { useToast } from '@/components/ui/use-toast';

function useHandleOpen() {
    const { toast } = useToast();

    const dispatch = useAppDispatch();

    return useCallback(async () => {
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
}

export default useHandleOpen;
