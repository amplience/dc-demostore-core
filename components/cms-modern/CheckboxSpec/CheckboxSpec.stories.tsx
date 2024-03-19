import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import CheckboxSpec from '@components/cms-modern/CheckboxSpec';

export default {
    title: 'Atoms/Checkbox',
    component: CheckboxSpec,
} as Meta;

export const ExampleContent: Story = (args) => <CheckboxSpec />;
