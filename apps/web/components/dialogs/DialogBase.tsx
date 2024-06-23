import { type PropsWithChildren } from 'react';
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
import { Flex } from '@markslides/ui/flex';
import { Box } from '@markslides/ui/box';
import { IconButton } from '@markslides/ui/icon-button';

export interface DialogProps extends PropsWithChildren {
    title: string;
    description: string;
    onOpenChange: (open: boolean) => void;
}

export interface DialogPropsWithPayload extends DialogProps {
    payload: Record<string, any>;
}

function DialogBase(props: DialogProps) {
    const { title, description, onOpenChange, children } = props;

    return (
        <DialogRoot
            open={true}
            onOpenChange={onOpenChange}>
            <DialogPortal>
                <DialogOverlay />
                <DialogContent>
                    <Flex
                        alignItems='center'
                        justifyContent='space-between'>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogClose asChild>
                            <IconButton
                                size='sm'
                                variant='outline'
                                icon={
                                    <XIcon
                                        fontSize='1.4rem'
                                        color='black'
                                    />
                                }
                            />
                        </DialogClose>
                    </Flex>
                    {!!description && (
                        <DialogDescription>{description}</DialogDescription>
                    )}

                    <Box paddingTop='8px'>{children}</Box>
                </DialogContent>
            </DialogPortal>
        </DialogRoot>
    );
}

export default DialogBase;
