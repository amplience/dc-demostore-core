import React from 'react';
import {Meta, StoryFn} from '@storybook/react'


import AccordionSpec from '@components/cms-modern/AccordionSpec';

export default {
    title: 'Molecules/Accordion',
    component: AccordionSpec,
} as Meta;

export const ExampleContent: StoryFn = (args) => <AccordionSpec />;
