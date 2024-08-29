import type { Meta, StoryObj } from '@storybook/react';
import {
    DialogRoot,
    DialogTrigger,
    DialogPortal,
    DialogOverlay,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from '@markslides/ui/dialog';
import { XIcon } from 'lucide-react';

interface DialogProps {}

function Dialog(props: DialogProps) {
    return (
        <DialogRoot>
            <DialogTrigger asChild>
                <button>Edit profile</button>
            </DialogTrigger>
            <DialogPortal>
                <DialogOverlay />
                <DialogContent>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when
                        you're done.
                    </DialogDescription>
                    <fieldset>
                        <label htmlFor='name'>Name</label>
                        <input
                            id='name'
                            defaultValue='Pedro Duarte'
                        />
                    </fieldset>
                    <fieldset>
                        <label htmlFor='username'>Username</label>
                        <input
                            id='username'
                            defaultValue='@peduarte'
                        />
                    </fieldset>
                    <div
                        style={{
                            display: 'flex',
                            marginTop: 25,
                            justifyContent: 'flex-end',
                        }}>
                        <DialogClose asChild>
                            <button>Save changes</button>
                        </DialogClose>
                    </div>
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

const meta: Meta<typeof Dialog> = {
    component: Dialog,
    argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Dialog>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
    render: (props) => <Dialog {...props} />,
    name: 'Dialog',
    args: {},
};
