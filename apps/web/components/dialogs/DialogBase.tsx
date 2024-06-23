import { useCallback, type PropsWithChildren } from 'react';
import { XIcon } from 'lucide-react';
import {
    DialogRoot,
    DialogPortal,
    DialogOverlay,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from '@markslides/ui/dialog';
import { closeDialog } from '@/redux/slices/dialogSlice';
import useAppDispatch from '@/redux/hooks/useAppDispatch';
import { type DialogKey } from '@/components/dialogs';

export interface DialogProps extends PropsWithChildren {
    dialogKey: DialogKey;
    title: string;
    description: string;
}

export interface DialogPropsWithPayload extends DialogProps {
    payload: Record<string, any>;
}

function DialogBase(props: DialogProps) {
    const { dialogKey, title, description, children } = props;

    const dispatch = useAppDispatch();

    const handleOpenChange = useCallback(
        (open: boolean) => {
            if (!open) {
                dispatch(closeDialog(dialogKey));
            }
        },
        [dialogKey, dispatch]
    );

    return (
        <DialogRoot
            open={true}
            onOpenChange={handleOpenChange}>
            <DialogPortal>
                <DialogOverlay />
                <DialogContent>
                    <DialogTitle>{title}</DialogTitle>
                    {!!description && (
                        <DialogDescription>{description}</DialogDescription>
                    )}

                    {children}

                    <DialogClose asChild>
                        <button
                            className='IconButton'
                            aria-label='Close'>
                            <XIcon />
                        </button>
                    </DialogClose>
                </DialogContent>
            </DialogPortal>
        </DialogRoot>
    );
}

export default DialogBase;
