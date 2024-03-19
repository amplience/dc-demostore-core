import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import AccordionSpec from '@components/cms-modern/AccordionSpec';

export default {
    title: 'Molecules/Accordion',
    component: AccordionSpec,
} as Meta;

export const ExampleContent: Story = (args) => <AccordionSpec />;
