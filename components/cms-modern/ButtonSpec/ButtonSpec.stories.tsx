import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import ButtonSpec from '@components/cms-modern/ButtonSpec';

export default {
    title: 'Atoms/Button',
    component: ButtonSpec,
} as Meta;

export const ExampleContent: StoryFn = (args) => <ButtonSpec />;
