//

import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import TypographySpec from '@components/cms-modern/TypographySpec';

export default {
  title: 'Atoms/Typography',
  component: TypographySpec,
} as Meta;

export const ExampleContent: Story = (args) => <TypographySpec />
