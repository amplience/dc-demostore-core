import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import TableSpec from '@components/cms-modern/TableSpec';

export default {
  title: 'Molecules/Table',
  component: TableSpec,
} as Meta;

export const ExampleContent: Story = (args) => <TableSpec />
