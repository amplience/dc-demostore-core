import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import CheckboxSpec from '@components/cms-modern/CheckboxSpec';

export default {
    title: 'Atoms/Checkbox',
    component: CheckboxSpec,
} as Meta;

export const ExampleContent: StoryFn = (args) => <CheckboxSpec />;
