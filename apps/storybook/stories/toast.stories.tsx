import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
    ToastProvider,
    ToastRoot,
    ToastTitle,
    ToastDescription,
    ToastAction,
    ToastViewport,
} from '@markslides/ui/toast';

function Toast() {
    const [open, setOpen] = useState(false);

    return (
        <ToastProvider swipeDirection='right'>
            <button
                onClick={() => {
                    setOpen(true);
                }}>
                Show
            </button>

            <ToastRoot
                open={open}
                onOpenChange={setOpen}
                duration={1500}>
                <ToastTitle>Hello, Toast!</ToastTitle>
                <ToastDescription asChild>
                    This is a sample toast
                </ToastDescription>
                <ToastAction
                    asChild
                    altText='Goto schedule to undo'>
                    <button>Undo</button>
                </ToastAction>
            </ToastRoot>
            <ToastViewport />
        </ToastProvider>
    );
}

const meta: Meta<typeof Toast> = {
    component: Toast,
    argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Toast>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
    render: (props) => <Toast />,
    name: 'Toast',
    args: {},
};
