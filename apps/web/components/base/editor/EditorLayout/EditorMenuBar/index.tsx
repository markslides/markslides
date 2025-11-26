import { useCallback, memo } from 'react';
import Link from 'next/link';
import {
    MenubarRoot,
    MenubarMenu,
    MenubarTrigger,
    // MenubarSubTrigger,
    MenubarPortal,
    MenubarContent,
    // MenubarSubContent,
    MenubarItem,
    // MenubarSub,
    MenubarSeparator,
    // MenubarCheckboxItem,
    // MenubarItemIndicator,
    // MenubarRadioGroup,
    // MenubarRadioItem,
    MenubarRightSlot,
} from '@markslides/ui/menu-bar';
import useAppDispatch from '@/redux/hooks/useAppDispatch';
import { setIsSlideShowMode } from '@/redux/slices/appSlice';
import { openDialog } from '@/redux/slices/dialogSlice';
import NewSlideMenubarItem from '@/components/base/editor/EditorLayout/EditorMenuBar/NewSlideMenubarItem';
import OpenMenubarItem from '@/components/base/editor/EditorLayout/EditorMenuBar/OpenMenubarItem';
import SaveMenubarItem from '@/components/base/editor/EditorLayout/EditorMenuBar/SaveMenubarItem';
import SaveAsMenubarItem from '@/components/base/editor/EditorLayout/EditorMenuBar/SaveAsMenubarItem';
import ExportToPdfMenubarItem from '@/components/base/editor/EditorLayout/EditorMenuBar/ExportToPdfMenubarItem';
import appConst from '@/lib/constants/appConst';
import { useTranslations } from 'next-intl';
import { LOCALE_NAMES, LOCALES } from '@/i18n/routing';

function EditorMenuBar() {
    const t = useTranslations('EditorMenuBar');
    const dispatch = useAppDispatch();

    const handleClickSlideSetting = useCallback(() => {
        dispatch(
            openDialog({
                key: 'SlideSetting',
            })
        );
    }, [dispatch]);

    const handleClickUndoButton = useCallback(() => {
        const undoButton = document.querySelector<HTMLButtonElement>(
            `#${appConst.EDITOR_TOOLBAR_ID} > button:nth-child(1)`
        );

        if (undoButton) {
            undoButton.click();
        }
    }, []);

    const handleClickRedoButton = useCallback(() => {
        const redoButton = document.querySelector<HTMLButtonElement>(
            `#${appConst.EDITOR_TOOLBAR_ID} > button:nth-child(2)`
        );

        if (redoButton) {
            redoButton.click();
        }
    }, []);

    const handleClickSlideShow = useCallback(() => {
        dispatch(setIsSlideShowMode(true));
    }, [dispatch]);

    return (
        <MenubarRoot>
            <MenubarMenu>
                <MenubarTrigger>{t('file')}</MenubarTrigger>
                <MenubarPortal>
                    <MenubarContent
                        align='start'
                        sideOffset={5}
                        alignOffset={-3}>
                        <NewSlideMenubarItem t={t} />
                        <OpenMenubarItem t={t} />
                        <SaveMenubarItem t={t} />
                        <SaveAsMenubarItem t={t} />

                        <MenubarSeparator />

                        <ExportToPdfMenubarItem t={t} />

                        <MenubarSeparator />

                        <MenubarItem onClick={handleClickSlideSetting}>
                            {t('setting')}
                        </MenubarItem>
                    </MenubarContent>
                </MenubarPortal>
            </MenubarMenu>

            <MenubarMenu>
                <MenubarTrigger>{t('edit')}</MenubarTrigger>
                <MenubarPortal>
                    <MenubarContent
                        align='start'
                        sideOffset={5}
                        alignOffset={-3}>
                        <MenubarItem onClick={handleClickUndoButton}>
                            {t('undo')}
                            <MenubarRightSlot>⌘Z</MenubarRightSlot>
                        </MenubarItem>
                        <MenubarItem onClick={handleClickRedoButton}>
                            {t('redo')}
                            <MenubarRightSlot>⌘⇧Z</MenubarRightSlot>
                        </MenubarItem>
                    </MenubarContent>
                </MenubarPortal>
            </MenubarMenu>

            <MenubarMenu>
                <MenubarTrigger>{t('view')}</MenubarTrigger>
                <MenubarPortal>
                    <MenubarContent
                        align='start'
                        sideOffset={5}
                        alignOffset={-3}>
                        <MenubarItem onClick={handleClickSlideShow}>
                            ► {t('show')}
                        </MenubarItem>
                    </MenubarContent>
                </MenubarPortal>
            </MenubarMenu>

            <MenubarMenu>
                <MenubarTrigger>{t('help')}</MenubarTrigger>
                <MenubarPortal>
                    <MenubarContent
                        align='start'
                        sideOffset={5}
                        alignOffset={-3}>
                        <Link
                            target='_blank'
                            referrerPolicy='no-referrer'
                            href='https://www.markslides.ai/intro'>
                            <MenubarItem>{t('about')}</MenubarItem>
                        </Link>
                        <Link
                            target='_blank'
                            referrerPolicy='no-referrer'
                            href='https://www.markdownguide.org/basic-syntax/'>
                            <MenubarItem>{t('syntax')}</MenubarItem>
                        </Link>
                    </MenubarContent>
                </MenubarPortal>
            </MenubarMenu>

            <MenubarMenu>
                <MenubarTrigger>{t('switchLocale')}</MenubarTrigger>
                <MenubarPortal>
                    <MenubarContent
                        align='start'
                        sideOffset={5}
                        alignOffset={-3}>
                        {LOCALES.map((locale) => (
                            <Link
                                href={`/${locale}`}
                            >
                                <MenubarItem>{LOCALE_NAMES[locale]}</MenubarItem>
                            </Link>
                        ))}
                    </MenubarContent>
                </MenubarPortal>
            </MenubarMenu>
        </MenubarRoot>
    );
}

export default memo(EditorMenuBar);
