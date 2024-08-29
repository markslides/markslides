import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from '@markslides/ui/progress';

const meta: Meta<typeof Progress> = {
    component: Progress,
    argTypes: {
        size: {
            control: { type: 'radio' },
            options: ['xs', 'sm', 'md', 'lg', 'xl'],
        },
    },
};

export default meta;

type Story = StoryObj<typeof Progress>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
    render: (props) => <Progress {...props}>Hello</Progress>,
    name: 'Progress',
    args: {
        size: 'md',
        value: 80,
    },
};
