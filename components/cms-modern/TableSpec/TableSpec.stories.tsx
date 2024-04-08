import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import TableSpec from '@components/cms-modern/TableSpec';

export default {
    title: 'Molecules/Table',
    component: TableSpec,
} as Meta;

export const ExampleContent: StoryFn = (args) => <TableSpec />;
