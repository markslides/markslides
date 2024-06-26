import { useEffect, useMemo } from 'react';
import useAppSelector from '@/redux/hooks/useAppSelector';
import useAppDispatch from '@/redux/hooks/useAppDispatch';
import { openDialog } from '@/redux/slices/dialogSlice';
import useHandleOpen from '@/hooks/app/useHandleOpen';
import useHandleSave from '@/hooks/app/useHandleSave';
import useHandleSaveAs from '@/hooks/app/useHandleSaveAs';
import useUserAgent from '@/hooks/agent/useUserAgent';

function useShortcutsExtension() {
    const userAgent = useUserAgent();

    const handleOpen = useHandleOpen();
    const handleSave = useHandleSave();
    const handleSaveAs = useHandleSaveAs();

    const markdownContent = useAppSelector((state) => state.local.content);
    const dispatch = useAppDispatch();

    const keymaps = useMemo(() => {
        if (userAgent.os) {
            return [
                {
                    isMatched: (event: KeyboardEvent) => {
                        if (userAgent.os === 'Windows') {
                            return (
                                event.ctrlKey &&
                                event.altKey &&
                                event.code === 'KeyN'
                            );
                        } else {
                            return (
                                event.metaKey &&
                                event.altKey &&
                                event.code === 'KeyN'
                            );
                        }
                    },
                    callback: () => {
                        dispatch(
                            openDialog({
                                key: 'NewSlideConfirm',
                            })
                        );
                    },
                },
                {
                    isMatched: (event: KeyboardEvent) => {
                        if (userAgent.os === 'Windows') {
                            return event.ctrlKey && event.key === 'o';
                        } else {
                            return event.metaKey && event.key === 'o';
                        }
                    },
                    callback: handleOpen,
                },
                {
                    isMatched: (event: KeyboardEvent) => {
                        if (userAgent.os === 'Windows') {
                            return event.ctrlKey && event.key === 's';
                        } else {
                            return event.metaKey && event.key === 's';
                        }
                    },
                    callback: handleSave,
                },
                {
                    isMatched: (event: KeyboardEvent) => {
                        if (userAgent.os === 'Windows') {
                            return (
                                event.ctrlKey &&
                                event.altKey &&
                                event.code === 'KeyS'
                            );
                        } else {
                            return (
                                event.metaKey &&
                                event.altKey &&
                                event.code === 'KeyS'
                            );
                        }
                    },
                    callback: handleSaveAs,
                },
            ];
        }

        return [];
    }, [userAgent.os, markdownContent, handleSave, dispatch]);

    useEffect(() => {
        function handleKeydown(event: KeyboardEvent) {
            keymaps.some((keymap) => {
                if (keymap.isMatched(event)) {
                    event.preventDefault();
                    keymap.callback();
                }
            });
        }

        document.addEventListener('keydown', handleKeydown);
        return () => {
            document.removeEventListener('keydown', handleKeydown);
        };
    }, [keymaps]);
}

export default useShortcutsExtension;
