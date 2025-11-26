'use client';

import { useCallback } from 'react';
import dynamic from 'next/dynamic';
import useAppSelector from '@/redux/hooks/useAppSelector';
import useAppDispatch from '@/redux/hooks/useAppDispatch';
import { closeDialog } from '@/redux/slices/dialogSlice';
import { useTranslations } from 'next-intl';
const NewSlideConfirmDialog = dynamic(
    () => import('@/components/dialogs/NewSlideConfirmDialog'),
    {
        ssr: false,
    }
);
const SlideSettingDialog = dynamic(
    () => import('@/components/dialogs/SlideSettingDialog'),
    {
        ssr: false,
    }
);

export const dialogObjs = [
    {
        key: 'NewSlideConfirm',
        title: 'createTitle',
        description: 'createDescription',
        dialog: NewSlideConfirmDialog,
    },
    {
        key: 'SlideSetting',
        title: 'settingTitle',
        description: 'settingDescription',
        dialog: SlideSettingDialog,
    },
] as const;

const dialogKeys = dialogObjs.map((dialogObj) => dialogObj.key);
export type DialogKey = (typeof dialogKeys)[number];

function Dialogs() {
    const t = useTranslations('Dialogs');
    const dialogStateMap = useAppSelector(
        (state) => state.dialog.dialogStateMap
    );
    const dispatch = useAppDispatch();

    const handleClose = useCallback(
        (dialogKey: DialogKey) => {
            dispatch(closeDialog(dialogKey));
        },
        [dispatch]
    );

    return (
        <>
            {dialogObjs.map((dialogObj) => {
                const dialogState = dialogStateMap[dialogObj.key];
                if (dialogState) {
                    const DialogComponent = dialogObj.dialog;
                    return (
                        <DialogComponent
                            key={dialogObj.key}
                            title={t(dialogObj.title)}
                            description={t(dialogObj.description)}
                            onOpenChange={(open) => {
                                if (!open) {
                                    handleClose(dialogObj.key);
                                }
                            }}
                            payload={dialogState}
                            t={t}
                        />
                    );
                }

                return null;
            })}
        </>
    );
}

export default Dialogs;
