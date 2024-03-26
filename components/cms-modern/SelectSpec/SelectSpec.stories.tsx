import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import SelectSpec from '@components/cms-modern/SelectSpec';

export default {
    title: 'Atoms/Select',
    component: SelectSpec,
} as Meta;

export const ExampleContent: StoryFn = (args) => <SelectSpec />;
