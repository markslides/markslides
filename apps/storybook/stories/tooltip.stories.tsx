import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from '@markslides/ui/tooltip';

const meta: Meta<typeof Tooltip> = {
    component: Tooltip,
    argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
    render: (props) => (
        <Tooltip {...props}>
            <button>Hover Me</button>
        </Tooltip>
    ),
    name: 'Tooltip',
    args: {
        label: 'Hello, Tooltip!',
    },
};
