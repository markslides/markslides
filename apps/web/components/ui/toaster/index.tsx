'use client';

import {
    ToastProvider,
    ToastRoot,
    ToastTitle,
    ToastDescription,
    ToastAction,
    ToastViewport,
    ToastClose,
} from '@markslides/ui/toast';
import { useToast } from '@/components/ui/use-toast';

export function Toaster() {
    const { toasts } = useToast();

    return (
        <ToastProvider>
            {toasts.map(({ id, title, description, action, ...others }) => {
                return (
                    <ToastRoot
                        key={id}
                        {...others}>
                        <div>
                            {title && <ToastTitle>{title}</ToastTitle>}
                            {description && (
                                <ToastDescription>
                                    {description}
                                </ToastDescription>
                            )}
                        </div>
                        {action}
                        <ToastClose />
                    </ToastRoot>
                );
            })}
            <ToastViewport />
        </ToastProvider>
    );
}
