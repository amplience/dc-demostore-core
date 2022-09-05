import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import ButtonSpec from '@components/cms-modern/ButtonSpec';

export default {
  title: 'Atoms/Button',
  component: ButtonSpec,
} as Meta;

export const ExampleContent: Story = (args) => <ButtonSpec />
