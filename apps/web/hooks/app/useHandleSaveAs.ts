import { useCallback } from 'react';
import {
    fileSave,
    supported as isFileSystemAccessApiSupported,
} from 'browser-fs-access';
import { slideConfigUtil } from '@markslides/renderer';
import useAppSelector from '@/redux/hooks/useAppSelector';
import useAppDispatch from '@/redux/hooks/useAppDispatch';
import { setCurrentFileHandle } from '@/redux/slices/appSlice';
import { useToast } from '@/components/ui/use-toast';
import { useTranslations } from 'next-intl';

function useHandleSaveAs() {
    const { toast } = useToast();

    const slideConfigState = useAppSelector((state) => state.slideConfig);
    const markdownTitle = useAppSelector((state) => state.local.title);
    const markdownContent = useAppSelector((state) => state.local.content);
    const dispatch = useAppDispatch();
    const t = useTranslations('Toast');

    return useCallback(async () => {
        if (!isFileSystemAccessApiSupported) {
            toast({
                title: t('unsupportedApiTitle'),
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
                fileName: markdownTitle || t('untitled'),
                description: t('description'),
                extensions: ['.md'],
            });

            dispatch(setCurrentFileHandle(fileHandle));
        } catch (error) {
            console.log(error);
        }
    }, [dispatch]);
}

export default useHandleSaveAs;
