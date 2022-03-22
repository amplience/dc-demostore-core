import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import SelectSpec from '@components/cms-modern/SelectSpec';

export default {
  title: 'Atoms/Select',
  component: SelectSpec,
} as Meta;

export const ExampleContent: Story = (args) => <SelectSpec />
