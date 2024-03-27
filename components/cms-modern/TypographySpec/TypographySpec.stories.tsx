//

import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import TypographySpec from '@components/cms-modern/TypographySpec';

export default {
    title: 'Atoms/Typography',
    component: TypographySpec,
} as Meta;

export const ExampleContent: StoryFn = (args) => <TypographySpec />;
